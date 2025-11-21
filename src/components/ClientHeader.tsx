"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, Gauge, User, Trophy, Lightbulb, Siren, LogOut } from "lucide-react";

export default function ClientHeader() {
  const [user, setUser] = useState<any>(null);
  const [score, setScore] = useState(97); // à remplacer plus tard par la vraie donnée

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const getScoreColor = (s => {
    if (s >= 90) return "bg-green-500";
    if (s >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/car-logo.svg" alt="Taplak" width={36} height={36} />
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Taplak
          </span>
        </Link>

        {/* Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 mt-8">
              {/* Mon score – gros et beau */}
              <Link href="/profil" className="flex items-center gap-4 px-2">
                <div className={`w-16 h-16 rounded-full ${getScoreColor(score)} flex items-center justify-center justify-center text-white font-black text-2xl shadow-lg`}>
                  {score}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mon score</p>
                  <p className="text-lg font-bold">{score}/100</p>
                </div>
              </Link>

              <div className="h-px bg-border" />

              <Button variant="ghost" size="lg" asChild className="justify-start">
                <Link href="/profil" className="gap-3">
                  <User className="h-5 w-5" /> Mon profil
                </Link>
              </Button>

              <Button variant="ghost" size="lg" asChild className="justify-start">
                <Link href="/classement" className="gap-3">
                  <Trophy className="h-5 w-5" /> Classement
                </Link>
              </Button>

              <Button variant="ghost" size="lg" asChild className="justify-start">
                <Link href="/conduite" className="gap-3">
                  <Lightbulb className="h-5 w-5" /> Optimiser ma conduite
                </Link>
              </Button>

              <Button className="bg-red-600 hover:bg-red-700 text-white justify-start" size="lg" asChild>
                <Link href="/p/nouveau" className="gap-3">
                  <Siren className="h-5 w-5" /> Faire un signalement
                </Link>
              </Button>

              <Button variant="ghost" size="lg" onClick={logout} className="justify-start text-muted-foreground">
                <LogOut className="h-5 w-5" /> Déconnexion
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Version desktop – on garde propre et aéré */}
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profil" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              <span className="font-bold">{score}</span>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/classement">Classement</Link>
          </Button>

          <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm" asChild>
            <Link href="/p/nouveau" className="flex items-center gap-2">
              <Siren className="h-4 w-4" /> Signalement
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
