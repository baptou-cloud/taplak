"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LogOut, User, Car } from "lucide-react";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-xl border-2 border-slate-200 hover:border-slate-900 transition"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-black">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="font-semibold text-slate-800 hidden sm:block">
          {user.email?.split("@")[0]}
        </span>
      </button>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden animate-in slide-in-from-top duration-200">
            <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <p className="text-sm opacity-80">Connecté en tant que</p>
              <p className="text-lg font-bold truncate">{user.email}</p>
            </div>

            <a
              href="/profil"
              className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition"
            >
              <User className="w-6 h-6 text-slate-700" />
              <div>
                <p className="font-semibold">Mon profil</p>
                <p className="text-sm text-slate-500">Ma plaque · Mon score</p>
              </div>
            </a>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 text-red-600 transition"
            >
              <LogOut className="w-6 h-6" />
              <span className="font-semibold">Déconnexion</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
