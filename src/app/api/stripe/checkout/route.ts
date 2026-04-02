import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'
import { stripe, PRICES, RUSH_FEE, SHIPPING, SIZE_LABELS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  const { size, rush, notes, photoFilename, photoLink } = await request.json()

  // Validate the size against our known prices
  if (!size || !PRICES[size]) {
    return NextResponse.json({ error: 'Invalid size selected' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Build the line items Stripe will display on the checkout page
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Custom Lithophane — ${SIZE_LABELS[size]}`,
          description: `3D printed photo lithophane, ${SIZE_LABELS[size]}`,
        },
        unit_amount: PRICES[size], // In cents
      },
      quantity: 1,
    },
  ]

  if (rush) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Rush Processing',
          description: 'Ships in 2–3 business days instead of 5–7',
        },
        unit_amount: RUSH_FEE,
      },
      quantity: 1,
    })
  }

  lineItems.push({
    price_data: {
      currency: 'usd',
      product_data: { name: 'Shipping' },
      unit_amount: SHIPPING,
    },
    quantity: 1,
  })

  // Store order details in Stripe metadata so the webhook can recreate the order in our DB.
  // Metadata values are limited to 500 characters each.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    billing_address_collection: 'required', // Ensures we get the customer's name
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}/order`,
    metadata: {
      size,
      rush:          rush ? 'true' : 'false',
      notes:         (notes || '').substring(0, 500),
      photoFilename: (photoFilename || '').substring(0, 500),
      photoLink:     (photoLink || '').substring(0, 500),
    },
  })

  return NextResponse.json({ url: session.url })
}
