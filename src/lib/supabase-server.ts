// src/lib/supabase-server.ts – FIX TYPE ERROR COOKIES NEXT 16
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const createClient = cache(async () => {
  const cookieStore = await cookies()  // ← AWAIT FIXE LE TYPE PROMISE
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options?: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server Component can't set cookies
          }
        },
        remove(name: string, options?: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Server Component can't remove cookies
          }
        },
      },
    }
  )
})
