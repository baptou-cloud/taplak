// src/components/Header.tsx – VERSION 100% FONCTIONNELLE (session détectée instantanément)
"use client";

import { supabase } from "@/lib/supabaseClient";
import { User, LogOut, UserCircle, Car, AlertTriangle, ThumbsUp, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  // On récupère l'utilisateur + on écoute les changements
  useEffect(() => {
    // 1. Chargement initial
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    // 2. Écoute en temps réel des changements de session
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // Si on vient de se connecter → on rafraîchit la page pour être sûr
      if (event === "SIGNED_IN") {
        router.refresh();
      }
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
                  className="rounded-full border-2 border-slate-200"
                />
              ) : (
                <UserCircle className="w-10 h-10 text-slate-600" />
              )}
              <span className="font-semibold text-slate-800 hidden sm:block">
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
            >
              Se connecter
            </Link>
          )}

          {/* Menu déroulant */}
          {dropdownOpen && user && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100">
                <p className="font-bold text-slate-900 text-lg">
                  {user.user_metadata?.full_name || "Conducteur anonyme"}
                </p>
                <p className="text-sm text-slate-600">{user.email}</p>
              </div>

              <div className="py-2">
                <Link href="/profil" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition">
                  <User className="w-5 h-5 text-slate-600" /> Mes informations
                </Link>
                <Link href="/profil/conduite" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition">
                  <Car className="w-5 h-5 text-emerald-600" /> Mon profil conducteur
                </Link>
                <Link href="/signalements" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition">
                  <AlertTriangle className="w-5 h-5 text-orange-600" /> Mes signalements
                </Link>
                <Link href="/votes" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition">
                  <ThumbsUp className="w-5 h-5 text-blue-600" /> Mes votes
                </Link>
                <Link href="/signaler" className="flex items-center gap-4 px-6 py-4 hover:bg-emerald-50 transition font-semibold text-emerald-700">
                  <PlusCircle className="w-5 h-5" /> Créer un signalement
                </Link>
              </div>

              <div className="border-t border-slate-200 pt-2">
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 text-red-600 font-medium transition"
                >
                  <LogOut className="w-5 h-5" /> Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
