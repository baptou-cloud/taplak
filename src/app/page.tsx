// src/app/page.tsx – version définitive (titre réduit, équilibre parfait)
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Camera, Shield, Eye } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24">

      {/* Titre – taille idéale : imposant mais élégant */}
      <div className="text-center mb-20">
        <h1 
          className="text-7xl md:text-8xl lg:text-9xl leading-none font-black tracking-tight text-gray-900"
          style={{ 
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em"
          }}
        >
          Taplak
        </h1>

        <p className="mt-10 text-xl md:text-2xl text-gray-600 font-light max-w-3xl leading-relaxed">
          Application citoyenne de signalement anonyme et vérifié<br className="hidden md:block" />
          des comportements dangereux sur la route
        </p>
      </div>

      {/* Barre de recherche – toujours énorme et classe */}
      <form action="/p" className="w-full max-w-4xl">
        <div className="relative">
          <Input
            name="plaque"
            placeholder="AA-123-BB"
            className="h-32 md:h-36 text-5xl md:text-6xl text-center font-mono tracking-widest placeholder:text-gray-400
                       border-0 rounded-full shadow-2xl bg-white/95 backdrop-blur-md
                       focus:ring-4 focus:ring-blue-500/20 focus:outline-none pl-28 pr-80"
            autoFocus
            required
            pattern="[A-Z]{2}-[0-9]{3}-[A-Z]{2}"
          />
          <Button className="absolute right-5 top-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-blue-900 hover:bg-blue-800 shadow-2xl">
            <Search className="h-12 w-12" />
          </Button>
        </div>
      </form>

      {/* 3 étapes – parfaites */}
      <div className="mt-32 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 text-gray-500">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Camera className="h-7 w-7 text-gray-700" />
          </div>
          <span className="text-lg font-medium">Preuve claire</span>
        </div>
        <div className="hidden md:block w-24 h-px bg-gray-300"></div>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Shield className="h-7 w-7 text-gray-700" />
          </div>
          <span className="text-lg font-medium">Vérification humaine</span>
        </div>
        <div className="hidden md:block w-24 h-px bg-gray-300"></div>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Eye className="h-7 w-7 text-gray-700" />
          </div>
          <span className="text-lg font-medium">Consultation volontaire</span>
        </div>
      </div>
    </main>
  );
}
