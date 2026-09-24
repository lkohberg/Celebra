import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DAY = 24 * 60 * 60 * 1000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const now = new Date();

  // 1. Deactivate expired live events
  const { data: expired, error: expErr } = await supabase
    .from("events")
    .update({ status: "archived" })
    .eq("status", "live")
    .lte("expires_at", now.toISOString())
    .select("id");
  if (expErr) console.error("Deactivation failed:", expErr);
  for (const e of expired || []) {
    await supabase.from("event_logs").insert({ event_id: e.id, action: "auto_deactivated", details: { at: now.toISOString() } });
  }

  // 2. Reminder 10 days before expiry (window: 9 to 10 days left)
  const { data: events, error } = await supabase
    .from("events")
    .select("id, title, user_id, expires_at")
    .eq("status", "live")
    .gt("expires_at", new Date(now.getTime() + 9 * DAY).toISOString())
    .lte("expires_at", new Date(now.getTime() + 10 * DAY).toISOString());

  if (error) {
    console.error("Error querying events:", error);
    return new Response(JSON.stringify({ error: "Query failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let sent = 0;
  for (const event of events || []) {
    const { data: userData } = await supabase.auth.admin.getUserById(event.user_id);
    const email = userData?.user?.email;
    if (!email) continue;
    const daysLeft = Math.max(1, Math.round((new Date(event.expires_at).getTime() - now.getTime()) / DAY));
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "renewal-reminder",
        recipientEmail: email,
        idempotencyKey: `renewal-${event.id}-${String(event.expires_at).slice(0, 10)}`,
        templateData: { eventTitle: event.title, daysLeft },
      },
    });
    sent++;
  }

  return new Response(JSON.stringify({ sent, deactivated: expired?.length || 0 }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
