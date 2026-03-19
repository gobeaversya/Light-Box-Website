import Stripe from 'stripe'

// The ! tells TypeScript "I know this env var exists, don't warn me".
// If it doesn't exist at runtime, Stripe will throw a clear error.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

// Prices in cents — Stripe always works in the smallest currency unit
export const PRICES: Record<string, number> = {
  '4x5':  4000,  // $40.00
  '6x8':  6000,  // $60.00
  '8x10': 8000,  // $80.00
}

export const RUSH_FEE = 1500  // $15.00
export const SHIPPING  = 900  //  $9.00

export const SIZE_LABELS: Record<string, string> = {
  '4x5':  '4×5"',
  '6x8':  '6×8"',
  '8x10': '8×10"',
}
