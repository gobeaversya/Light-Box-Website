import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })

  // Set an HttpOnly cookie — HttpOnly means JavaScript on the page can't read it,
  // which protects it from XSS attacks. The middleware reads it server-side.
  response.cookies.set('admin-auth', password, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'lax',
    maxAge:   60 * 60 * 24 * 7, // 1 week in seconds
    path:     '/',
  })

  return response
}
