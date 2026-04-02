import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

// IMPORTANT: We must read the raw request body as text before Stripe can verify the signature.
// If you parse it as JSON first (which Next.js would normally do), the body changes slightly
// and the signature check fails. request.text() gives us the original bytes.
export async function POST(request: NextRequest) {
  const body      = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // constructEvent verifies the webhook payload hasn't been tampered with.
    // This is how we know the request actually came from Stripe.
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
  }

  // Only handle the event we care about
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Grab the order details we packed into metadata during checkout
    const { size, rush, notes, photoFilename, photoLink } = session.metadata ?? {}

    // customer_details is populated by Stripe once the customer completes checkout
    const customerName  = session.customer_details?.name  || 'Unknown'
    const customerEmail = session.customer_details?.email || ''

    try {
      await prisma.order.create({
        data: {
          customerName,
          customerEmail,
          size:          size ?? 'unknown',
          rush:          rush === 'true',
          notes:         notes || null,
          photoFilename: photoFilename || null,
          photoLink:     photoLink || null,
          stripeSessionId: session.id,
          amountPaid:    session.amount_total ?? 0,
          paymentStatus: 'paid',
          status:        'Pending',
        },
      })
    } catch (dbErr) {
      // Log but don't return an error — Stripe would retry and create duplicate orders.
      // In production you'd want idempotency checks here.
      console.error('Failed to save order to database:', dbErr)
    }
  }

  // Always return 200 to acknowledge receipt, even for events we don't handle.
  // If we return an error, Stripe retries the webhook.
  return NextResponse.json({ received: true })
}
