// src/app/page.tsx  ← remplace tout le fichier par ça
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Titre + sous-titre ultra épurés */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-black跟踪 tracking-tight text-gray-900">
          Taplak
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-600 font-light max-w-2xl">
          Application citoyenne de signalement anonyme et vérifié<br />
          des comportements dangereux sur la route
        </p>
      </div>

      {/* Barre de recherche – LA star, énorme, magnifique */}
      <form action="/p" className="w-full max-w-3xl">
        <Input
          name="plaque"
          placeholder="AA-123-BB"
          className="h-24 md:h-28 text-4xl md:text-5xl text-center font-mono tracking-widest placeholder:text-gray-400
                     border-0 shadow-2xl rounded-3xl bg-white/90 backdrop-blur-sm
                     focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all"
          autoFocus
          required
          pattern="[A-Z]{2}-[0-9]{3}-[A-Z]{2}"
        />
      </form>

      {/* 3 étapes – ultra discrètes, juste pour habiller */}
      <div className="mt-24 flex flex-col md:flex-row gap-12 text-center text-gray-500 text-sm">
        <div>1. Prise de preuve claire</div>
        <div className="hidden md:block">·</div>
        <div>2. Vérification humaine</div>
        <div className="hidden md:block">·</div>
        <div>3. Consultation volontaire du score</div>
      </div>

      {/* Optionnel : petit logo voiture en bas à droite – très discret */}
      <div className="absolute bottom-8 right-8 opacity-20">
        <Image src="/car-logo.svg" alt="" width={80} height={80} />
      </div>
    </main>
  );
}
