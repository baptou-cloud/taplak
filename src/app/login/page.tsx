"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Connecté ! Redirection...");
      window.location.href = "/";
    }
    setLoading(false);
  };

  const handleMagicLink = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "https://taplak.vercel.app" },
    });
    if (error) setMessage("Erreur : " + error.message);
    else setMessage("Lien magique envoyé ! Vérifie tes mails");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <LogIn className="w-20 h-20 mx-auto mb-8 text-slate-800" />
        <h1 className="text-4xl font-black text-slate-900 mb-4">Connexion</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="ton@email.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg"
          />
          <input
            type="password"
            placeholder="mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transition"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleMagicLink}
            disabled={loading || !email}
            className="text-slate-600 underline hover:text-slate-900"
          >
            Recevoir un lien magique par mail
          </button>
        </div>

        {message && <p className="mt-6 text-lg font-medium">{message}</p>}

        <p className="text-xs text-slate-500 mt-10">
          Pas encore de compte ? Entre n’importe quel email + mot de passe → il se crée automatiquement.
        </p>
      </div>
    </div>
  );
}
