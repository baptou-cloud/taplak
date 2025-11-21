// src/components/Header.tsx – VERSION FINALE 2025
"use client";

import { supabase } from "@/lib/supabaseClient";
import { LogOut, Menu, User, Car, AlertTriangle, ThumbsUp, PlusCircle, HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN") router.refresh();
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-4xl font-black text-slate-900 tracking-tighter">
          Taplak
        </Link>

        <div className="relative">
          {user ? (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 hover:bg-slate-100 rounded-xl px-4 py-2 transition"
            >
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.email[0].toUpperCase()}
                </div>
              )}
              <span className="hidden sm:block font-medium">
                {user.email.split("@")[0]}
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
            >
              Connexion
            </Link>
          )}

          {dropdownOpen && user && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="p-5 border-b bg-gradient-to-r from-slate-50 to-slate-100">
                  <p className="font-bold text-slate-900 text-lg">
                    {user.user_metadata?.full_name || user.email.split("@")[0]}
                  </p>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>

                <div className="py-2">
                  <Link href="/profil" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition">
                    <User className="w-5 h-5 text-slate-600" /> Mon profil
                  </Link>
                  <Link href="/conduite" className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-50 transition text-emerald-700 font-medium">
                    <HeartHandshake className="w-5 h-5" /> Optimiser ma conduite
                  </Link>
                  <Link href="/signalement" className="flex items-center gap-4 px-6 py-4 hover:bg-orange-50 transition text-orange-700 font-medium">
                    <PlusCircle className="w-5 h-5" /> Faire un signalement
                  </Link>
                </div>

                <div className="border-t border-slate-200 pt-2">
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 text-red-600 font-medium transition"
                  >
                    <LogOut className="w-5 h-5" /> Déconnexion
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
