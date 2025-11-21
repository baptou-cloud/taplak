// middleware.ts – VERSION TEMPORAIRE 100% SAFE (recommandée maintenant)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(_req: NextRequest) {
  // On désactive complètement le middleware tant qu’on n’a pas besoin d’auth obligatoire
  return NextResponse.next()
}

export const config = {
  matcher: [], // rien ne déclenche le middleware → 0 crash
}
