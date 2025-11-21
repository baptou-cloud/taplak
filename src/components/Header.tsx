// src/components/Header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase-server";
import Image from "next/image";
import { LogOut, User, Car, Siren, LogIn } from "lucide-react";

export default async function Header() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/globe.svg" alt="Taplak" width={36} height={36} />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Taplak
          </span>
        </Link>

        {/* Navigation */}
        <nav className className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profil" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Mon profil
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/conduite" className="flex items-center gap-2">
              <Car classNameName="h-4 w-4" />
              Optimiser ma conduite
            </Link>
          </Button>

          {user ? (
            <>
              <Button size="sm" className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/p/nouveau" className="flex items-center gap-2 text-white">
                  <Siren className="h-4 w-4" />
                  Faire un signalement
                </Link>
              </Button>

              <form action="/auth/signout" method="post">
                <Button variant="ghost" size="sm" type="submit" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </form>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className className="h-4 w-4" />
                Connexion
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
