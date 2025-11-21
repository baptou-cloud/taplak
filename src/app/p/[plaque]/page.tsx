// src/app/p/[plaque]/page.tsx – version finale, propre, réaliste, premium
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Shield, ThumbsUp, ThumbsDown, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function PlaquePage() {
  const router = useRouter();
  const { plaque: rawPlaque } = useParams();
  const plaque = (rawPlaque as string).toUpperCase();

  const [vehicle, setVehicle] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      let { data } = await supabase.from("vehicles").select("*").eq("plaque", plaque).single();

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
    if (!user) return router.push("/login");
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl text-gray-600">Chargement…</div>;
  if (!vehicle) return null;

  const scoreBg = vehicle.score >= 90 ? "bg-green-600" : vehicle.score >= 70 ? "bg-amber-500" : "bg-red-600";

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">

      {/* Retour */}
      <a href="/" className="absolute top-20 left-6 flex items-center gap-2 text-gray-600 hover:text-black text-lg">
        <ArrowLeft className="w-5 h-5" /> Retour
      </a>

      {/* Plaque encadrée – style vrai plaque française */}
      <div className="mb-16">
        <div className="bg-white border-4 border-black rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-blue-700 px-6 py-2 flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-wider">F</span>
          </div>
          <div className="bg-white px-8 py-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-widest text-black text-center font-mono">
              {plaque}
            </h1>
          </div>
          <div className="bg-blue-700 px-6 py-2 flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-wider">75</span>
          </div>
        </div>
      </div>

      {/* Score – rectangle arrondi, discret mais impactant */}
      <div className="mb-12">
        <div className={`inline-flex items-center justify-center px-16 py-10 rounded-3xl ${scoreBg} shadow-xl`}>
          <span className="text-8xl md:text-9xl font-black text-white">{vehicle.score}</span>
        </div>
      </div>

      {/* Verdict */}
      <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-16 text-center">
        {vehicle.score === 100 ? "Conducteur exemplaire" :
         vehicle.score >= 90 ? "Excellente conduite" :
         vehicle.score >= 70 ? "Quelques points d’attention" : "Vigilance recommandée"}
      </p>

      {/* Score 100 – badge spécial */}
      {vehicle.score === 100 && (
        <div className="bg-green-50 border-2 border-green-300 rounded-2xl px-10 py-6 flex items-center gap-4 mb-16">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
          <div>
            <p className="text-xl font-bold text-green-800">Aucun signalement</p>
            <p className="text-gray-700">Reconnue comme exemplaire</p>
          </div>
        </div>
      )}

      {/* Votes – épurés */}
      <div className="w-full max-w-md">
        {user ? (
          <div className="grid grid-cols-2 gap-8">
            <button onClick={() => handleVote("up")} className="p-8 bg-green-50 hover:bg-green-100 rounded-2xl border-2 border-green-200 transition">
              <ThumbsUp className="w-16 h-16 mx-auto mb-3 text-green-600" />
              <span className="block text-4xl font-black text-green-600">{vehicle.votes_up}</span>
              <span className="text-green-700">Bon conducteur</span>
            </button>
            <button onClick={() => handleVote("down")} className="p-8 bg-red-50 hover:bg-red-100 rounded-2xl border-2 border-red-200 transition">
              <ThumbsDown className="w-16 h-16 mx-auto mb-3 text-red-600"
