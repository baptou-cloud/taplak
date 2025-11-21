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
    const { data: listener } = supabase.auth.onAuthStateChange((_, s) => setUser(s?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
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

        {/* Hamburger – bien visible, style Apple */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full hover:bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-7 w-7 text-gray-800" />
          </Button>

          {/* Menu déroulant – ultra propre */}
          {open && (
            <div className="absolute right-0 top-16 w-80 rounded-2xl border border-gray-200 bg-white shadow-2xl py-4">
              {user ? (
                <>
                  <Link href="/profil" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                    <User className="h-6 w-6" />
                    <span className="font-medium">Mon profil</span>
                  </Link>
                  <Link href="/classement" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                    <Trophy className="h-6 w-6" />
                    <span className="font-medium">Classement</span>
                  </Link>
                  <Link href="/conduite" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                    <Lightbulb className="h-6 w-6" />
                    <span className="font-medium">Optimiser ma conduite</span>
                  </Link>
                  <div className="h-px bg-gray-200 my-2" />
                  <Link href="/p/nouveau" className="flex items-center gap-4 px-6 py-4 text-red-600 font-medium hover:bg-red-50">
                    <Siren className="h-6 w-6" />
                    Faire un signalement
                  </Link>
                  <button onClick={logout} className="flex items-center gap-4 px-6 py-4 w-full text-left hover:bg-gray-50">
                    <LogOut className="h-6 w-6" />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <Link href="/login" className="block px-6 py-4 text-center font-medium hover:bg-gray-50">
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
