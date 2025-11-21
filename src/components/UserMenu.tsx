"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LogOut, User, HeartHandshake } from "lucide-react";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div className="fixed top-20 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-slate-200 hover:shadow-xl transition"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
          {user.email[0].toUpperCase()}
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b">
              <p className="text-sm text-slate-500">Connecté en tant que</p>
              <p className="font-bold truncate">{user.email}</p>
            </div>

            <a href="/profil" className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
              <User className="w-5 h-5" /> Mon profil
            </a>
            <a href="/conduite" className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
              <HeartHandshake className="w-5 h-5 text-green-600" /> Optimiser ma conduite
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600"
            >
              <LogOut className="w-5 h-5" /> Déconnexion
            </button>
          </div>
        </>
      )}
    </div>
  );
}
