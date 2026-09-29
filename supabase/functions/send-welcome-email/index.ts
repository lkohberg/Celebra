import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendAndLog } from '../_shared/email-send-log.ts'

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

// Sends the welcome email only to an account that registered in the last 15 minutes.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  let email: string
  try {
    const body = await req.json()
    email = String(body?.email ?? '').trim().toLowerCase()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }
  if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email' }, 400)
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  let user: any = null
  for (let page = 1; page <= 20 && !user; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 })
    if (error) return json({ error: 'Lookup failed' }, 500)
    user = data.users.find((u) => u.email?.toLowerCase() === email)
    if (data.users.length < 1000) break
  }
  if (!user || Date.now() - new Date(user.created_at).getTime() > 15 * 60 * 1000) {
    return json({ sent: false })
  }

  try {
    const result = await sendAndLog(supabase, 'welcome', email, { idempotencyKey: `welcome-${user.id}` })
    return json(result)
  } catch (err) {
    console.error('Welcome email failed', err instanceof Error ? err.message : err)
    return json({ error: 'Send failed' }, 500)
  }
})
