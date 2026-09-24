import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2025-01-27.acacia",
});

const MANUAL_BLOCK_SUFFIXES = ["-illustration", "-musicpro", "-bgmusic"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    const body = await req.text();
    const event: Stripe.Event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const eventId = session.metadata?.event_id;

      if (eventId && session.metadata?.type === "renewal") {
        const { data: ev } = await supabase
          .from("events")
          .select("expires_at, created_at, status")
          .eq("id", eventId)
          .single();
        const currentEnd = ev?.expires_at
          ? new Date(ev.expires_at)
          : new Date(new Date(ev?.created_at ?? Date.now()).getTime() + 180 * 86400000);
        const base = currentEnd.getTime() > Date.now() ? currentEnd : new Date();
        const newEnd = new Date(base.getTime() + 180 * 86400000);
        const update: Record<string, unknown> = { expires_at: newEnd.toISOString() };
        if (ev?.status === "archived") update.status = "live";
        await supabase.from("events").update(update).eq("id", eventId);
        await supabase.from("event_logs").insert({
          event_id: eventId,
          action: "renewal_completed",
          details: { stripe_session_id: session.id, amount: session.amount_total, currency: session.currency, expires_at: newEnd.toISOString() },
          actor_id: session.metadata?.user_id,
        });
        console.log(`Renewal completed for event ${eventId}, expires ${newEnd.toISOString()}`);
      } else if (eventId) {
        // Check if event has manual blocks
        const { data: eventData } = await supabase
          .from("events")
          .select("selected_blocks")
          .eq("id", eventId)
          .single();

        const selectedBlocks = (eventData?.selected_blocks || []) as string[];
        const hasManual = selectedBlocks.some((id: string) =>
          MANUAL_BLOCK_SUFFIXES.some(suffix => id.endsWith(suffix))
        );

        const newStatus = hasManual ? "pending_review" : "live";

        await supabase
          .from("events")
          .update({
            status: newStatus,
            stripe_payment_id: session.payment_intent as string,
            expires_at: new Date(Date.now() + 180 * 86400000).toISOString(),
          })
          .eq("id", eventId);

        await supabase.from("event_logs").insert({
          event_id: eventId,
          action: "payment_completed",
          details: {
            stripe_session_id: session.id,
            amount: session.amount_total,
            currency: session.currency,
            status_set: newStatus,
          },
          actor_id: session.metadata?.user_id,
        });

        console.log(`Payment completed for event ${eventId}, status: ${newStatus}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
