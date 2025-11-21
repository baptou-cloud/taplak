// src/components/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/lib/supabase-client";
import Image from "next/image";
import { LogOut, User, Car, Siren, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, supabase } = useSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/globe.svg" alt="Taplak" width={40} height={40} />
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Taplak
          </span>
        </Link>

        {/* Menu */}
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
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Connexion
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
