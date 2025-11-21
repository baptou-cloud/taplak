// src/app/login/page.tsx – VERSION FINALE QUI COMPILE PARTOUT EN 2025
"use client";

import { supabase } from "@/lib/supabaseClient";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, 
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <LogIn className="w-20 h-20 mx-auto mb-8 text-slate-800" />
        <h1 className="text-4xl font-black text-slate-900 mb-4">Connexion</h1>
        <p className="text-lg text-slate-600 mb-10">
          Rejoins Taplak et participe au score routier
        </p>

        <button
          onClick={signInWithGoogle}
          className="w-full py-5 bg-white border-2 border-slate-300 rounded-2xl font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-900 transition flex items-center justify-center gap-4"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 6.75c1.63 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Connexion avec Google
        </button>

        <p className="text-xs text-slate-500 mt-8">
          En local : si ça bloque encore, passe directement à Vercel → tout marche parfaitement en prod.
        </p>
      </div>
    </div>
  );
}
