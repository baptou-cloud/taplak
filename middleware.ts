// middleware.ts – TEST ULTIME
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  console.log('URL  →', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('KEY  →', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'OK (longue clé)' : 'MANQUANTE')

  return NextResponse.next()
}

export const config = {
  matcher: '/p/:path*', // on test juste sur les pages qui crashent
}
