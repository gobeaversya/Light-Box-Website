import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let the login page through
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  const cookieValue = request.cookies.get('admin-auth')?.value

  // Verify the signed session token instead of comparing raw passwords
  const isAuthed =
    !!adminPassword &&
    !!cookieValue &&
    verifySessionToken(cookieValue, adminPassword)

  if (!isAuthed) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/orders/:path*'],
}
