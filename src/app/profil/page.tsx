"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Car, Trophy, ThumbsUp } from "lucide-react";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const [votes, setVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Récupère tous les votes de l'utilisateur (via les véhicules modifiés récemment ou table séparée plus tard)
      const { data } = await supabase
        .from("vehicles")
        .select("plaque, score, votes_up, votes_down")
        .order("updated_at", { ascending: false })
        .limit(20);

      setVotes(data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center mb-10">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-5xl font-black mb-6">
            {user?.email[0].toUpperCase()}
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">{user?.email}</h1>
          <p className="text-xl text-slate-600">Membre Taplak</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <p className="text-5xl font-black text-slate-900">0</p>
            <p className="text-slate-600">Signalements postés</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <ThumbsUp className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <p className="text-5xl font-black text-green-600">0</p>
            <p className="text-slate-600">Votes positifs</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <Car className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <p className="text-5xl font-black text-blue-600">—</p>
            <p className="text-slate-600">Ma plaque perso (bientôt)</p>
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-8">Mes derniers votes</h2>
        <div className="space-y-4">
          {votes.length === 0 ? (
            <p className="text-center text-slate-500 text-xl">Aucun vote pour l'instant. Va signaler quelqu’un !</p>
          ) : (
            votes.map((v) => (
              <a
                key={v.plaque}
                href={`/p/${v.plaque}`}
                className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition flex justify-between items-center"
              >
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
