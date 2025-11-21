"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);  // Toggle inscription/connexion

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isSignUp) {
      // Inscription
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage("Erreur inscription : " + error.message);
      } else {
        setMessage("Compte créé ! Tu peux te connecter maintenant.");
        setIsSignUp(false);  // Passe en mode connexion
      }
    } else {
      // Connexion
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Erreur connexion : " + error.message);
      } else {
        setMessage("Connecté ! Redirection...");
        window.location.href = "/";
      }
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <LogIn className="w-20 h-20 mx-auto mb-8 text-slate-800" />
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          {isSignUp ? "Inscription" : "Connexion"}
        </h1>
        <p className="text-lg text-slate-600 mb-10">
          {isSignUp ? "Crée ton compte Taplak" : "Rejoins-nous et vote !"}
        </p>

        <form onSubmit={handleAuth} className="space-y-6">
          <input
            type="email"
            placeholder="ton@email.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:border-slate-900"
          />
          <input
            type="password"
            placeholder="mot de passe (min 6 caractères)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg focus:border-slate-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transition disabled:opacity-50"
          >
            {loading ? "Chargement..." : isSignUp ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={toggleMode}
            className="text-slate-600 underline hover:text-slate-900 text-sm"
          >
            {isSignUp ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
          </button>
        </div>

        {message && <p className="mt-6 text-lg font-medium text-slate-800">{message}</p>}

        <p className="text-xs text-slate-500 mt-10">
          Mot de passe : au moins 6 caractères. Pas de confirmation email pour l'instant.
        </p>
      </div>
    </div>
  );
}
