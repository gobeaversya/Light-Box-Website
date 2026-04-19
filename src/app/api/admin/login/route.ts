import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken } from '@/lib/auth'
import { isRateLimited, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  // Block after 5 failed attempts per IP within 15 minutes
  if (isRateLimited(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again in 15 minutes.' },
      { status: 429 },
    )
  }

  const { password } = await request.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  // Generate a signed session token instead of storing the raw password
  const token = createSessionToken(process.env.ADMIN_PASSWORD!)

  const response = NextResponse.json({ success: true })

  response.cookies.set('admin-auth', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 24 * 7, // 1 week
    path:     '/',
  })

  return response
}
