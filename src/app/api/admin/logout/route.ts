import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.redirect(
    new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  )

  // Clear the auth cookie by setting it to expire immediately
  response.cookies.set('admin-auth', '', {
    httpOnly: true,
    maxAge:   0,
    path:     '/',
  })

  return response
}
