import { createClient } from '@/utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  const { data: { user } } = await supabase.auth.getUser()

  // Protect routes that require authentication
  if (request.nextUrl.pathname.startsWith('/database-dashboard') && !user) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Redirect authenticated users away from auth page
  if (request.nextUrl.pathname === '/auth' && user) {
    return NextResponse.redirect(new URL('/database-dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
