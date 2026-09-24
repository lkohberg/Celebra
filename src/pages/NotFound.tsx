import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "@/i18n";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { locale } = useTranslation();
  const de = locale === "de";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <span className="font-display text-xl text-foreground">celebra<span className="text-primary">.at</span></span>
        <h1 className="font-display mt-6 mb-3 text-5xl text-foreground">404</h1>
        <p className="font-body mb-6 text-lg text-muted-foreground">{de ? "Diese Seite gibt es leider nicht." : "Sorry, this page does not exist."}</p>
        <Button asChild className="rounded-full font-body"><Link to="/">{de ? "Zur Startseite" : "Back to home"}</Link></Button>
      </div>
    </div>
  );
};

export default NotFound;
