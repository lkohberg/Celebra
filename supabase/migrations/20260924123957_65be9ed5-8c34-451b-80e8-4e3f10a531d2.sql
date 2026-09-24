ALTER TABLE public.events ADD COLUMN IF NOT EXISTS expires_at timestamptz;
UPDATE public.events SET expires_at = created_at + interval '180 days' WHERE expires_at IS NULL AND status IN ('live','archived','pending_review','paid');

CREATE OR REPLACE FUNCTION public.guard_event_owner_update()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL OR public.has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN NEW;
  END IF;
  IF NEW.expires_at IS DISTINCT FROM OLD.expires_at
     OR NEW.stripe_payment_id IS DISTINCT FROM OLD.stripe_payment_id
     OR NEW.price_paid IS DISTINCT FROM OLD.price_paid THEN
    RAISE EXCEPTION 'Not allowed to change payment fields';
  END IF;
  IF NEW.status = 'live' AND OLD.status IS DISTINCT FROM 'live' THEN
    IF OLD.status <> 'archived' OR OLD.stripe_payment_id IS NULL
       OR (OLD.expires_at IS NOT NULL AND OLD.expires_at <= now()) THEN
      RAISE EXCEPTION 'Event cannot be reactivated';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_event_owner_update ON public.events;
CREATE TRIGGER guard_event_owner_update BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.guard_event_owner_update();

DROP POLICY IF EXISTS "Users can update their own events" ON public.events;
CREATE POLICY "Users can update their own events" ON public.events FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK ((auth.uid() = user_id) AND (status = ANY (ARRAY['draft'::text, 'archived'::text, 'live'::text])));