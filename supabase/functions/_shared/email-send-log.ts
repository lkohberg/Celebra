import { sendTemplateEmail } from './transactional-email-templates/send-email.ts'

// Sends a registered template and records the outcome in email_send_log.
// Log failures are console-logged and never change the send result.
export async function sendAndLog(
  supabase: any,
  templateName: string,
  recipient: string,
  opts: { templateData?: Record<string, any>; idempotencyKey: string },
) {
  const log = async (status: string, error_message?: string) => {
    const { error } = await supabase.from('email_send_log').insert({
      message_id: null,
      template_name: templateName,
      recipient_email: recipient,
      status,
      error_message: error_message ?? null,
    })
    if (error) console.error('email_send_log insert failed', { code: error.code, message: error.message })
  }
  try {
    const result = await sendTemplateEmail(templateName, recipient, opts)
    await log(result.sent ? 'sent' : 'suppressed')
    return result
  } catch (err) {
    await log('failed', err instanceof Error ? err.message : String(err))
    throw err
  }
}
