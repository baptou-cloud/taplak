// src/app/report/page.tsx – LA page de signalement ultime
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Upload, Shield, CheckCircle2, Camera, Video } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const MOTIFS = [
  "Excès de vitesse", "Conduite dangereuse", "Dépassement dangereux", "Queue de poisson",
  "Injure ou geste obscène", "Sans feux", "Téléphone au volant", "Sans ceinture",
  "Conduite sous alcool", "Conduite sous stupéfiants", "Feu rouge grillé", "Refus de priorité",
  "Délit de fuite"
];

const VEHICLE_TYPES = ["Berline", "SUV", "Break", "Utilitaire", "Fourgon", "Moto", "Scooter", "Camion", "Poids lourd", "Bus", "Autre"];
const COLORS = ["Noir", "Blanc", "Gris", "Argent", "Bleu", "Rouge", "Vert", "Jaune", "Orange", "Marron", "Violet", "Rose"];

export default function ReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledPlaque = searchParams.get("plaque")?.toUpperCase() || "";

  const [plaque, setPlaque] = useState(prefilledPlaque);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ville, setVille] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [motifs, setMotifs] = useState<string[]>([]);
  const [sworn, setSworn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/"))) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !sworn || motifs.length === 0 || !selectedType || !selectedColor || !ville) return;

    setLoading(true);

    // 1. Upload direct vers Cloudflare R2 (à configurer plus tard – ici on simule)
    const fakeUrl = URL.createObjectURL(file); // À remplacer par vrai upload R2

    // 2. Créer le report en pending
    const { error } = await supabase.from("reports").insert({
      vehicle_plaque: plaque.replace(/[^A-Z0-9]/g, ""),
      media_url: fakeUrl,
      media_type: file.type.startsWith("video") ? "video" : "image",
      location: ville,
      vehicle_type: selectedType,
      vehicle_color: selectedColor,
      motifs,
      sworn_honor: true,
      status: "pending"
    });

    if (!error) {
      setSuccess(true);
      setTimeout(() => router.push(prefilledPlaque ? `/p/${plaque}` : "/"), 3000);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <CheckCircle2 className="w-24 h-24 text-green-600 mb-8" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Signalement envoyé</h1>
        <p className="text-xl text-gray-600 text-center max-w-md">
          Merci pour ta vigilance citoyenne.<br />Ton signalement est en cours de vérification humaine.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-black mb-10">
        <ArrowLeft className="w-5 h-5" /> Retour
      </a>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-center mb-4">Signaler un comportement</h1>
        <p className="text-center text-gray-600 text-lg mb-12">Preuve claire • Vérification humaine • Anonymat garanti</p>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Plaque */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-3">Plaque d’immatriculation</label>
            <input
              type="text"
              value={plaque}
              onChange={(e) => setPlaque(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))}
              placeholder="AA-123-BB"
              className="w-full px-6 py-5 text-3xl font-mono text-center rounded-xl border-2 border-gray-300 focus:border-black transition"
              required
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-3">Photo ou vidéo de la preuve</label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-gray-500 transition"
            >
              {preview ? (
                <div className="space-y-4">
                  {file?.type.startsWith("video") ? <Video className="w-20 h-20 mx-auto text-gray-600" /> : <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />}
                  <p className="text-lg font-medium">{file?.name}</p>
                  <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="text-red-600">Supprimer</button>
                </div>
              ) : (
                <>
                  <Upload className="w-20 h-20 mx-auto text-gray-400 mb-4" />
                  <p className="text-xl text-gray-600">Glisse ton fichier ici</p>
                  <p className="text-sm text-gray-500 mt-2">ou clique pour sélectionner (photo ou vidéo)</p>
                  <input type="file" accept="image/*,video/*" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} className="hidden" />
                </>
              )}
            </div>
          </div>

          {/* Ville / Lieu */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-3">Lieu (ville, quartier, autoroute…)</label>
            <input
              type="text"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              placeholder="Ex: Paris 8e, A6 km 120, Lyon Part-Dieu"
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-black transition"
              required
            />
          </div>

          {/* Type de véhicule – QCS */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-4">Type de véhicule</label>
            <div className="grid grid-cols-3 gap-3">
              {VEHICLE_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`py-4 rounded-xl border-2 font-medium transition ${
                    selectedType === type ? "bg-black text-white border-black" : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Couleur – QCS */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-4">Couleur dominante</label>
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`py-8 rounded-xl border-2 font-medium transition relative overflow-hidden ${
                    selectedColor === color ? "ring-4 ring-black ring-offset-4" : ""
                  }`}
                  style={{ backgroundColor: color === "Blanc" ? "#f3f4f6" : color.toLowerCase() }}
                >
                  <span className={color === "Blanc" || color === "Jaune" ? "text-black" : "text-white"}>{color}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Motifs */}
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-4">Comportement(s) observé(s)</label>
            <div className="grid grid-cols-2 gap-3">
              {MOTIFS.map((motif) => (
                <label key={motif} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={motifs.includes(motif)}
                    onChange={(e) => e.target.checked ? setMotifs([...motifs, motif]) : setMotifs(motifs.filter(m => m !== motif))}
                    className="w-6 h-6 rounded border-gray-300"
                  />
                  <span className="text-lg">{motif}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Serment */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-gray-200">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-700" />
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              Je certifie sur l’honneur que les faits rapportés sont exacts,<br />
              que la preuve jointe est authentique et n’a pas été modifiée.
            </p>
            <label className="flex items-center justify-center gap-3 mt-6 cursor-pointer">
              <input type="checkbox" checked={sworn} onChange={(e) => setSworn(e.target.checked)} className="w-7 h-7" required />
              <span className="text-xl font-bold">Je prête serment sur l’honneur</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !file || !sworn || motifs.length === 0 || !selectedType || !selectedColor || !ville}
            className="w-full py-6 bg-black text-white text-xl font-bold rounded-full hover:bg-gray-800 disabled:bg-gray-400 transition"
          >
            {loading ? "Envoi en cours…" : "Envoyer le signalement"}
          </button>
        </form>
      </div>
    </main>
  );
}
