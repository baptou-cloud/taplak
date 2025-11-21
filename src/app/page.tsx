// src/app/page.tsx
"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [plaque, setPlaque] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plaque.trim()) return;

    // Normalise la plaque (supprime espaces, met en majuscules, remplace espaces par tirets)
    const formatted = plaque.trim().toUpperCase().replace(/\s+/g, "-");
    router.push(`/p/${formatted}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-16">

        {/* Titre */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">
            Taplak
          </h1>
          <p className="text-xl md:text-2xl text-slate-600">
            La réputation routière de chaque véhicule en France
          </p>
        </div>

        {/* Barre de recherche fonctionnelle */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={plaque}
            onChange={(e) => setPlaque(e.target.value)}
            placeholder="Entrez une plaque ⋅ ex : AB-123-CD"
            className="w-full pl-16 pr-52 py-7 text-xl md:text-2xl rounded-2xl border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition-all shadow-lg focus:shadow-xl placeholder:text-slate-400"
            autoFocus
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-9 h-9 text-slate-500" />

          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105 active:scale-95"
          >
            Rechercher
          </button>
        </form>

        {/* Exemples rapides */}
        <div className="flex flex-wrap justify-center gap-6">
          {["AA-111-AA", "BB-222-BB", "CC-333-CC", "DZ-777-ZZ"].map((ex) => (
            <button
              key={ex}
              onClick={() => router.push(`/p/${ex}`)}
              className="px-8 py-4 bg-white rounded-xl border-2 border-slate-200 text-slate-700 font-medium hover:border-slate-900 hover:shadow-lg hover:scale-105 transition"
            >
              {ex}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}