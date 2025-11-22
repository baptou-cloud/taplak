// src/components/ClientHeader.tsx (ou où tu l’as placé)
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, Search, Siren, User, Trophy, Lightbulb, LogOut } from "lucide-react";

export default function ClientHeader() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // Fonction pour aller sur /report avec la plaque pré-remplie si on est sur une page /p/...
  const goToReport = () => {
    const match = window.location.pathname.match(/\/p\/([A-Z0-9-]+)/);
    const plaque = match ? match[1] : "";
    window.location.href = plaque ? `/report?plaque=${plaque}` : "/report";
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo + Titre */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/car-logo.svg" alt="Taplak" width={36} height={36} />
          <span
            className="text-2xl font-black tracking-tight text-gray-900"
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
              letterSpacing: "-0.02em"
            }}
          >
            Taplak
          </span>
        </Link>

        {/* Hamburger */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full hover:bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-7 w-7 text-gray-800" />
          </Button>

          {/* Menu déroulant */}
          {open && (
            <div className="absolute right-0 top-16 w-80 rounded-2xl border border-gray-200 bg-white shadow-2xl py-4">
              {user ? (
                <>
                  <Link href="/profil" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    <User className="h-6 w-6" />
                    <span className="font-medium">Mon profil</span>
                  </Link>

                  <Link href="/classement" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    <Trophy className="h-6 w-6" />
                    <span className="font-medium">Classement</span>
                  </Link>

                  <Link href="/conduite" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    <Lightbulb className="h-6 w-6" />
                    <span className="font-medium">Optimiser ma conduite</span>
                  </Link>

                  <div className="h-px bg-gray-200 my-2" />

                  {/* Bouton Signalement – pré-remplit la plaque si possible */}
                  <button
                    onClick={goToReport}
                    className="flex w-full items-center gap-4 px-6 py-4 text-red-600 font-medium hover:bg-red-50 text-left"
                  >
                    <Siren className="h-6 w-6" />
                    Faire un signalement
                  </button>

                  <button onClick={logout} className="flex w-full items-center gap-4 px-6 py-4 hover:bg-gray-50 text-left">
                    <LogOut className="h-6 w-6" />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <Link href="/login" className="block px-6 py-4 text-center font-medium hover:bg-gray-50" onClick={() => setOpen(false)}>
                  Connexion
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
