"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Car, ThumbsUp, AlertTriangle } from "lucide-react";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const [votes, setVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // On va chercher les 20 dernières plaques modifiées (simulation "mes votes")
      const { data } = await supabase
        .from("vehicles")
        .select("plaque, score, votes_up, votes_down, updated_at")
        .order("updated_at", { ascending: false })
        .limit(20);

      setVotes(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center mb-10">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-6xl font-black mb-6">
            {user?.email[0].toUpperCase()}
          </div>
          <h1 className="text-4xl font-black mb-2">{user?.email}</h1>
          <p className="text-2xl text-green-600">Conducteur Taplak</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <Car className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <p className="text-5xl font-black">–</p>
            <p>Ma plaque</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <ThumbsUp className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <p className="text-5xl font-black text-green-600">0</p>
            <p>Votes positifs</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-orange-600" />
            <p className="text-5xl font-black text-orange-600">0</p>
            <p>Signalements</p>
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-8">Mes derniers votes / vues</h2>
        <div className="space-y-4">
          {votes.length === 0 ? (
            <p className="text-center text-xl text-slate-500">Aucune activité pour l’instant</p>
          ) : (
            votes.map(v => (
              <a key={v.plaque} href={`/p/${v.plaque}`} className="block bg-white rounded-2xl p-6 shadow hover:shadow-xl transition flex justify-between items-center">
                <span className="text-2xl font-black">{v.plaque}</span>
                <span className={`text-4xl font-black ${v.score >= 80 ? "text-green-600" : v.score >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                  {v.score}
                </span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
