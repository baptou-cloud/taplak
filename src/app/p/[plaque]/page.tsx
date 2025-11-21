// src/app/p/[plaque]/page.tsx – VERSION FINALE QUI MARCHE SUR VERCEL EN 2025
import { ArrowLeft, ThumbsUp, ThumbsDown, CheckCircle2, LogIn } from "lucide-react";
import { createServerComponentClient } from "@supabase/ssr"; // ← NOUVEAU PAQUET
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function PlaquePage({
  params,
}: {
  params: Promise<{ plaque: string }>;
}) {
  const { plaque } = await params;
  const plaqueClean = plaque.toUpperCase().replace(/\s+/g, "-");

  // Client Supabase compatible Next.js 16+
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  });

  const { data: { user } } = await supabase.auth.getUser();

  // Recherche ou création du véhicule
  let { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("plaque", plaqueClean)
    .single();

  if (!vehicle) {
    const { data } = await supabase
      .from("vehicles")
      .insert({ plaque: plaqueClean, score: 100, votes_up: 0, votes_down: 0 })
      .select()
      .single();
    vehicle = data;
  }

  if (!vehicle) redirect("/");

  const scoreColor =
    vehicle.score >= 80
      ? "text-green-600"
      : vehicle.score >= 60
      ? "text-yellow-600"
      : "text-red-600";

  const borderColor =
    vehicle.score >= 80
      ? "border-green-600"
      : vehicle.score >= 60
      ? "border-yellow-600"
      : "border-red-600";

  const getVerdict = () => {
    if (vehicle.score === 100) return "Conducteur exemplaire – aucun signalement";
    if (vehicle.score >= 80) return "Excellente conduite globale";
    if (vehicle.score >= 60) return "Quelques points d'attention";
    return "Vigilance recommandée";
  };

  // Action de vote (server action)
  const voteAction = async (direction: "up" | "down") => {
    "use server";
    if (!user) return;

    const increment =
      direction === "up"
        ? { votes_up: vehicle!.votes_up + 1, score: Math.min(100, vehicle!.score + 2) }
        : { votes_down: vehicle!.votes_down + 1, score: Math.max(30, vehicle!.score - 5) };

    const supabaseVote = createServerComponentClient({
      cookies: () => cookies(),
    });

    await supabaseVote
      .from("vehicles")
      .update(increment)
      .eq("id", vehicle!.id);

    revalidatePath(`/p/${plaqueClean}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto p-6 pt-24">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-10 text-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Retour
        </a>

        <div className="flex justify-center mb-10">
          <div
            className={`inline-block px-12 py-7 rounded-2xl border-4 ${borderColor} bg-white shadow-2xl`}
          >
            <span className="text-6xl font-black tracking-wider text-slate-900">
              {plaqueClean}
            </span>
          </div>
        </div>

        <div className="text-center mb-16">
          <p className="text-2xl text-slate-600 mb-4">Score Taplak</p>
          <div className={`text-9xl font-black tabular-nums ${scoreColor} mb-6`}>
            {vehicle.score}
          </div>
          <p className="text-2xl font-medium text-slate-800 max-w-2xl mx-auto">
            {getVerdict()}
          </p>
        </div>

        {vehicle.score === 100 && (
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-12 text-center">
            <CheckCircle2 className="w-24 h-24 mx-auto mb-6 text-green-600" />
            <p className="text-3xl font-bold text-green-700">Aucun signalement</p>
            <p className="text-xl text-slate-600 mt-4">
              Conducteur exemplaire reconnu par la communauté
            </p>
          </div>
        )}

        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-lg text-slate-600 mb-6">
            {user ? "Ton avis compte – merci !" : "Connecte-toi pour voter"}
          </p>

          <div className="flex justify-center gap-16">
            {user ? (
              <>
                <form action={voteAction.bind(null, "up")}>
                  <button className="group flex items-center gap-4 px-10 py-6 bg-green-50 hover:bg-green-100 rounded-3xl border-4 border-green-300 transition transform hover:scale-110">
                    <ThumbsUp className="w-16 h-16 text-green-600 group-hover:scale-125 transition" />
                    <div className="text-left">
                      <div className="text-4xl font-black text-green-600">
                        {vehicle.votes_up}
                      </div>
                      <div className="text-green-700 font-medium">Oui</div>
                    </div>
                  </button>
                </form>

                <form action={voteAction.bind(null, "down")}>
                  <button className="group flex items-center gap-4 px-10 py-6 bg-red-50 hover:bg-red-100 rounded-3xl border-4 border-red-300 transition transform hover:scale-110">
                    <ThumbsDown className="w-16 h-16 text-red-600 group-hover:scale-125 transition" />
                    <div className="text-left">
                      <div className="text-4xl font-black text-red-600">
                        {vehicle.votes_down}
                      </div>
                      <div className="text-red-700 font-medium">Non</div>
                    </div>
                  </button>
                </form>
              </>
            ) : (
              <a
                href="/login"
                className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                <LogIn className="w-6 h-6" />
                Se connecter pour voter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
