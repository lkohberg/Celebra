import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useTranslation } from "@/i18n";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [processing, setProcessing] = useState(false);
  const { locale } = useTranslation();
  const L = (de: string, en: string) => (locale === "de" ? de : en);

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid === false && data.reason === "already_unsubscribed") setStatus("already");
        else if (data.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setProcessing(true);
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="py-12 text-center space-y-4">
          <span className="font-display text-xl font-bold text-foreground">
            celebra<span className="text-primary">.at</span>
          </span>

          {status === "loading" && (
            <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
          )}

          {status === "valid" && (
            <>
              <p className="font-body text-foreground">{L("Möchtest du dich von E-Mail-Benachrichtigungen abmelden?", "Do you want to unsubscribe from email notifications?")}</p>
              <Button onClick={handleUnsubscribe} disabled={processing} className="font-body">
                {processing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {L("Abmelden bestätigen", "Confirm unsubscribe")}
              </Button>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <p className="font-body text-foreground">{L("Du wurdest erfolgreich abgemeldet.", "You have been unsubscribed.")}</p>
            </>
          )}

          {status === "already" && (
            <>
              <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="font-body text-muted-foreground">{L("Du bist bereits abgemeldet.", "You are already unsubscribed.")}</p>
            </>
          )}

          {status === "invalid" && (
            <>
              <XCircle className="w-12 h-12 text-destructive mx-auto" />
              <p className="font-body text-muted-foreground">{L("Ungültiger oder abgelaufener Link.", "Invalid or expired link.")}</p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-12 h-12 text-destructive mx-auto" />
              <p className="font-body text-muted-foreground">{L("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.", "Something went wrong. Please try again later.")}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UnsubscribePage;
