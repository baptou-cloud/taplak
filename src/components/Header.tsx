// src/components/Header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase-server";
import Image from "next/image";
import { LogOut, User, Car, Siren, LogIn } from "lucide-react";

export default async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-5xl">
        {/* Logo / Accueil */}
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/globe.svg" alt="Taplak" width={36} height={36} />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Taplak
          </span>
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profil" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Mon profil
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/conduite" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              Optimiser ma conduite
            </Link>
          </Button>

          {user ? (
            <>
              <Button size="sm" asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/p/nouveau" className="flex items-center gap-2">
                  <Siren className="w-4 h-4" />
                  Faire un signalement
                </Link>
              </Button>

              <form action="/auth/signout" method="post">
                <Button variant="ghost" size="sm" type="submit" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </form>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Connexion
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
