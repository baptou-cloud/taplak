// src/app/p/[plaque]/page.tsx – copie-colle par-dessus ton fichier actuel
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ThumbsUp, ThumbsDown, CheckCircle2, LogIn, AlertTriangle, Shield } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function PlaquePage() {
  const router = useRouter(); 
  const params = useParams();
  const plaqueRaw = params.plaque as string;
  const plaque = plaqueRaw.toUpperCase().replace(/-/g, "-");
  const [vehicle, setVehicle] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      let { data } = await supabase
        .from("vehicles")
        .select("*")
        .eq("plaque", plaque)
        .single();

      if (!data) {
        const { data: newVehicle } = await supabase
          .from("vehicles")
          .insert({ plaque, score: 100, votes_up: 0, votes_down: 0 })
          .select()
          .single();
        data = newVehicle;
      }
      setVehicle(data);
      setLoading(false);
    };
    fetchData();
  }, [plaque]);

  const handleVote = async (direction: "up" | "down") => {
    if (!user) {
      router.push("/login");
      return;
    }
    const delta = direction === "up" ? 2 : -5;
    const newScore = Math.max(30, Math.min(100, vehicle.score + delta));

    const { data } = await supabase
      .from("vehicles")
      .update({
        score: newScore,
        votes_up: direction === "up" ? vehicle.votes_up + 1 : vehicle.votes_up,
        votes_down: direction === "down" ? vehicle.votes_down + 1 : vehicle.votes_down,
      })
      .eq("id", vehicle.id)
      .select()
      .single();

    if (data) setVehicle(data);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-3xl font-light">Chargement…</div>;
  if (!vehicle) return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Plaque non trouvée</div>;

  const scoreColor = vehicle.score >= 90 ? "text-green-600" : vehicle.score >= 70 ? "text-amber-600" : "text-red-600";

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">

      {/* Retour discret */}
      <a href="/" className="absolute top-24 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 text-lg font-medium">
        <ArrowLeft className="w-5 h-5" /> Retour
      </a>

      {/* Plaque énorme */}
      <h1 className="text-7xl md:text-9xl font-black tracking-wider text-gray-900 font-mono mb-16">
        {plaque}
      </h1>

      {/* Score géant */}
      <div className="mb-20 text-center">
        <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full ${vehicle.score >= 90 ? "bg-green-500" : vehicle.score >= 70 ? "bg-amber-500" : "bg-red-500"} 
                        flex items-center justify-center shadow-2xl`}>
          <span className="text-9xl md:text-[180px] font-black text-white">{vehicle.score}</span>
        </div>
        <p className="mt-8 text-3xl md:text-4xl font-medium text-gray-800">
          {vehicle.score === 100 ? "Conducteur exemplaire" : vehicle.score >= 90 ? "Excellente conduite" : vehicle.score >= 70 ? "Quelques points d’attention" : "Vigilance recommandée"}
        </p>
      </div>

      {/* Message spécial score 100 */}
      {vehicle.score === 100 && (
        <div className="bg-green-50 rounded-3xl px-12 py-10 mb-16 flex flex-col items-center">
          <CheckCircle2 className="w-20 h-20 text-green-600 mb-4" />
          <p className="text-2xl font-bold text-green-800">Aucun signalement</p>
          <p className="text-gray-700 mt-2">Reconnue comme exemplaire par la communauté</p>
        </div>
      )}

      {/* Votes ou connexion */}
      <div className="text-center">
        {user ? (
          <div className="flex justify-center gap-20">
            <button
              onClick={() => handleVote("up")}
              className="group flex flex-col items-center gap-4 p-10 bg-green-50 hover:bg-green-100 rounded-3xl border-4 border-green-200 transition transform hover:scale-105"
            >
              <ThumbsUp className="w-20 h-20 text-green-600 group-hover:scale-110 transition" />
              <span className="text-5xl font-black text-green-600">{vehicle.votes_up}</span>
              <span className="text-green-700 font-medium">Bon conducteur</span>
            </button>

            <button
              onClick={() => handleVote("down")}
              className="group flex flex-col items-center gap-4 p-10 bg-red-50 hover:bg-red-100 rounded-3xl border-4 border-red-200 transition transform hover:scale-105"
            >
              <ThumbsDown className="w-20 h-20 text-red-600 group-hover:scale-110 transition" />
              <span className="text-5xl font-black text-red-600">{vehicle.votes_down}</span>
              <span className="text-red-700 font-medium">À surveiller</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <a href="/login" className="flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-full text-xl font-medium hover:bg-gray-800 transition">
              <LogIn className="w-6 h-6" /> Se connecter
            </a>
            <a href="/login" className="flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-full text-xl font-bold hover:bg-orange-700 transition">
              <AlertTriangle className="w-6 h-6" /> Signaler un comportement
            </a>
          </div>
        )}
      </div>

      {/* Mention légale discrète */}
      <p className="absolute bottom-10 text-center text-gray-500 text-sm max-w-2xl">
        <Shield className="inline w-4 h-4 mr-1" />
        Tous les signalements sont vérifiés manuellement avant publication. Aucune donnée personnelle n’est diffusée.
      </p>
    </main>
  );
}
