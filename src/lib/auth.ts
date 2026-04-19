import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

// Instead of storing the raw password in the cookie, we generate
// a signed session token: "nonce.signature". The middleware can verify
// the signature without the cookie ever revealing the password.

const ALG = 'sha256'

/** Create a signed session token. */
export function createSessionToken(secret: string): string {
  const nonce = randomBytes(32).toString('hex')
  const sig = createHmac(ALG, secret).update(nonce).digest('hex')
  return `${nonce}.${sig}`
}

/** Verify a session token against the secret. Returns true if valid. */
export function verifySessionToken(token: string, secret: string): boolean {
  const dot = token.indexOf('.')
  if (dot === -1) return false

  const nonce = token.substring(0, dot)
  const sig = token.substring(dot + 1)

  const expected = createHmac(ALG, secret).update(nonce).digest('hex')

  // Use timing-safe comparison to prevent timing attacks
  if (sig.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
}
