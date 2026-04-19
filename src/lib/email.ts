import { Resend } from 'resend'

// Lazy init so builds/imports don't fail when the env var isn't set locally.
// Resend throws on construction if the key is missing.
function getClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export type OrderEmailPayload = {
  customerName: string
  customerEmail: string
  size: string
  rush: boolean
  amountPaidCents: number
  notes: string | null
  photoFilename: string | null
  photoLink: string | null
}

export async function sendNewOrderEmail(order: OrderEmailPayload) {
  const resend = getClient()
  const to = process.env.ADMIN_EMAIL

  if (!resend || !to) {
    console.warn('Skipping order email: RESEND_API_KEY or ADMIN_EMAIL not set')
    return
  }

  const amount = `$${(order.amountPaidCents / 100).toFixed(2)}`

  // Only allow https:// URLs in email links to prevent javascript: or data: injection
  const safePhotoUrl = order.photoFilename && isSafeUrl(order.photoFilename)
    ? order.photoFilename : null
  const safePhotoLink = order.photoLink && isSafeUrl(order.photoLink)
    ? order.photoLink : null

  const photoBlock = safePhotoUrl
    ? `<p><a href="${escapeAttr(safePhotoUrl)}" style="background:#f59e0b;color:#111;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">View uploaded photo</a></p>`
    : safePhotoLink
      ? `<p><a href="${escapeAttr(safePhotoLink)}" style="background:#f59e0b;color:#111;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Open drive link</a></p>`
      : order.photoLink
        ? `<p style="color:#b91c1c"><strong>A photo link was provided but could not be verified.</strong> Check the admin dashboard.</p>`
        : `<p style="color:#b91c1c"><strong>No photo was provided.</strong> Reach out to the customer.</p>`

  const notesBlock = order.notes
    ? `<p><strong>Notes:</strong><br>${escapeHtml(order.notes)}</p>`
    : ''

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
  const adminUrl = baseUrl ? `${baseUrl}/admin` : '/admin'

  const html = `
    <div style="font-family:-apple-system,system-ui,sans-serif;max-width:560px;margin:0 auto;color:#111">
      <h2 style="color:#3b5530">New Lithophane Order</h2>
      <p><strong>${escapeHtml(order.customerName)}</strong> just placed an order for ${amount}.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:6px 0;color:#666">Customer</td><td>${escapeHtml(order.customerName)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td>${escapeHtml(order.customerEmail)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Size</td><td>${escapeHtml(order.size)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Rush</td><td>${order.rush ? 'Yes' : 'No'}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Amount paid</td><td>${amount}</td></tr>
      </table>
      ${notesBlock}
      ${photoBlock}
      <p style="margin-top:24px"><a href="${adminUrl}">Open admin dashboard →</a></p>
    </div>
  `

  try {
    await resend.emails.send({
      from: 'Tell Your Story <onboarding@resend.dev>',
      to,
      subject: `New order from ${order.customerName} · ${amount}`,
      html,
    })
  } catch (err) {
    console.error('Failed to send order email:', err)
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Escape a string for use inside an HTML attribute value. */
function escapeAttr(s: string): string {
  return escapeHtml(s)
}

/** Only allow http(s) URLs — blocks javascript:, data:, and other schemes. */
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}
