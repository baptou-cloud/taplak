"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LogOut, User, Car, HeartHandshake } from "lucide-react";

export default function UserFooter() {
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 flex-1 justify-center"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xl">
            {user.email[0].toUpperCase()}
          </div>
          <span className="font-bold text-slate-800">{user.email.split("@")[0]}</span>
        </button>

        {open && (
          <>
            <div className="fixed inset-0" onClick={() => setOpen(false)} />
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
              <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center">
                <p className="text-sm opacity-80">Connecté</p>
                <p className="font-bold truncate">{user.email}</p>
              </div>

              <a href="/profil" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50">
                <User className="w-6 h-6" /> Mon profil
              </a>
              <a href="/conduite" className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50">
                <HeartHandshake className="w-6 h-6 text-green-600" /> Optimiser ma conduite
              </a>
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px- 6 py-4 hover:bg-red-50 text-red-600 text-left">
                <LogOut className="w-6 h-6" /> Déconnexion
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
