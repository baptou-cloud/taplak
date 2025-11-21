// src/components/ClientHeader.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient"; // ton client existant
import { useState, useEffect } from "react";
import Image from "next/image";
import { LogOut, User, Car, Siren, LogIn } from "lucide-react";

export default function ClientHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/globe.svg" alt="Taplak" width={40} height={40} />
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Taplak
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profil">Mon profil</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/conduite">Optimiser ma conduite</Link>
          </Button>

          {user ? (
            <>
              <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm" asChild>
                <Link href="/p/nouveau" className="flex items-center gap-2">
                  <Siren className="h-4 w-4" />
                  Faire un signalement
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/login">Connexion</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
