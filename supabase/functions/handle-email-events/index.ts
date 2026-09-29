import { createEmailWebhookHandler } from 'npm:@lovable.dev/email-js@0.1.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

const MESSAGES = {
  bounce: 'Permanent bounce — email address is invalid or rejected',
  complaint: 'Spam complaint — recipient marked email as spam',
  unsubscribe: 'Recipient unsubscribed',
} as const
const STATUS = { bounce: 'bounced', complaint: 'complained', unsubscribe: 'suppressed' } as const

async function record(
  eventId: string,
  recipient: string,
  reason: 'bounce' | 'complaint' | 'unsubscribe',
) {
  const email = recipient.toLowerCase()
  const { error: suppressError } = await supabase
    .from('suppressed_emails')
    .upsert({ email, reason, metadata: null }, { onConflict: 'email' })
  if (suppressError) {
    console.error('Failed to upsert suppressed email', {
      code: suppressError.code, message: suppressError.message, event_id: eventId,
    })
    throw new Error('Failed to write suppression')
  }
  const { error: logError } = await supabase.from('email_send_log').insert({
    message_id: null,
    template_name: 'system',
    recipient_email: email,
    status: STATUS[reason],
    error_message: MESSAGES[reason],
    metadata: null,
  })
  if (logError) {
    console.error('Failed to insert email_send_log', {
      code: logError.code, message: logError.message, event_id: eventId,
    })
    throw new Error('Failed to write send log')
  }
}

const handler = createEmailWebhookHandler({
  apiKey: Deno.env.get('LOVABLE_API_KEY')!,
  on: {
    'email.bounced': async (event) => {
      await record(event.event_id, event.data.recipient, 'bounce')
    },
    'email.complaint': async (event) => {
      await record(event.event_id, event.data.recipient, 'complaint')
    },
    'email.unsubscribed': async (event) => {
      await record(event.event_id, event.data.recipient, 'unsubscribe')
    },
  },
})

Deno.serve((req) => handler(req))
