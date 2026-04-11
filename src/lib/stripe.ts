import Stripe from 'stripe'

// The ! tells TypeScript "I know this env var exists, don't warn me".
// If it doesn't exist at runtime, Stripe will throw a clear error.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

// Prices in cents. Stripe always works in the smallest currency unit.
export const PRICES: Record<string, number> = {
  'standard': 3999,  // $39.99
}

export const RUSH_FEE = 1500  // $15.00
export const SHIPPING  = 900  //  $9.00

export const SIZE_LABELS: Record<string, string> = {
  'standard': '6.5×6.5"',
}
