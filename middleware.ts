// middleware.ts – VERSION QUI MARCHE EN 2025 SUR VERCEL
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()

  // Si les vars d'env manquent → on skip le middleware sans crasher
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })
    await supabase.auth.getSession()
  } catch (error) {
    // Silently fail – on veut pas que le site crash parce que Supabase déconne
    console.error('Middleware Supabase error:', error)
  }

  return res
}

// On limite le middleware uniquement aux routes qui en ont vraiment besoin
// (tu n’as pas encore de routes protégées → donc on le désactive presque)
export const config = {
  matcher: [
    // '/((?!p/.*|api|_next/static|_next/image|favicon.ico).*)',  // ← version ultra safe
    // Ou temporairement désactive complètement le temps de tester :
    '/this-route-does-not-exist', // ← rien ne matche → middleware ignoré
  ],
}
