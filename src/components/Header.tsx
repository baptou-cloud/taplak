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
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/globe.svg" alt="Taplak" width={40} height={40} />
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Taplak
          </span>
        </Link>

        <nav className="flex items-center gap-3">
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
                  Signalement
                </Link>
              </Button>

              <form action="/auth/signout" method="post">
                <Button variant="ghost" size="sm" type="submit">
                  Déconnexion
                </Button>
              </form>
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
