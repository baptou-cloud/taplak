// src/lib/supabase-server.ts – CLIENT SERVER-SIDE FIXÉ POUR NEXT 16 TURBOPACK
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'  // ← LE MAGIC WRAPPER

export const createClient = cache(() => createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value
      },
      set(name: string, value: string, options?: any) {
        try {
          cookies().set({ name, value, ...options })
        } catch (error) {
          // Server Component can't set cookies
        }
      },
      remove(name: string, options?: any) {
        try {
          cookies().set({ name, value: '', ...options })
        } catch (error) {
          // Server Component can't remove cookies
        }
      },
    },
  }
))
