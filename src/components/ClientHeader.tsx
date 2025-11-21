"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Gauge, User, Trophy, Lightbulb, Siren, LogOut, Menu } from "lucide-react";

export default function ClientHeader() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const score = 97;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_, s) => setUser(s?.user ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const color = score >= 90 ? "bg-green-500" : score >= 70 ? "bg-amber-500" : "bg-red-500";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/car-logo.svg" alt="Taplak" width={36} height={36} />
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Taplak
          </span>
        </Link>

        {/* Menu mobile simple */}
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            <Menu className="h-6 w-6" />
          </Button>

          {open && (
            <div className="absolute right-0 top-16 w-72 rounded-lg border bg-white shadow-xl py-3 z-50">
              <Link href="/profil" className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50">
                <div className={`${color} w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl`}>
                  {score}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mon score</p>
                  <p className="font-bold">{score}/100</p>
                </div>
              </Link>
              <div className="h-px bg-gray-200 mx-4" />
              <Link href="/profil" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"><User className="h-5 w-5" />Mon profil</Link>
              <Link href="/classement" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"><Trophy className="h-5 w-5" />Classement</Link>
              <Link href="/conduite" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"><Lightbulb className="h-5 w-5" />Optimiser ma conduite</Link>
              <Link href="/p/nouveau" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-red-600 font-medium"><Siren className="h-5 w-5" />Faire un signalement</Link>
              <button onClick={logout} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-gray-600 w-full"><LogOut className="h-5 w-5" />Déconnexion</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
