import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware runs on the Edge (before your page/API loads) and can
// intercept requests, redirect, or modify them. We use it here as a
// lightweight auth gate for the admin section.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let the login page through — otherwise you'd be locked out forever!
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieValue = request.cookies.get('admin-auth')?.value

  // If the cookie doesn't match the password env var, block access
  if (!adminPassword || cookieValue !== adminPassword) {
    // Admin page requests → redirect to login
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    // Admin API requests → return 401 JSON
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

// Only run this middleware on admin routes.
// The /api/orders routes are protected so random visitors can't list all orders.
export const config = {
  matcher: ['/admin/:path*', '/api/orders/:path*'],
}
