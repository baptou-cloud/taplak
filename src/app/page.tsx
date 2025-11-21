// src/app/page.tsx – copie-colle direct (tout tient sur un écran)
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Camera, Shield, Eye } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">

      {/* Titre – taille idéale, imposant mais respire */}
      <div className="text-center mb-12">
        <h1 
          className="text-7xl md:text-8xl font-black tracking-tight text-gray-900"
          style={{ 
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: "-0.03em"
          }}
        >
          Taplak
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 font-light max-w-2xl leading-relaxed">
          Application citoyenne de signalement anonyme et vérifié<br className="hidden md:block" />
          des comportements dangereux sur la route
        </p>
      </div>

      {/* Barre de recherche + gros bouton loupe */}
      <form action="/p" className="w-full max-w-4xl mb-16">
        <div className="relative">
          <Input
            name="plaque"
            placeholder="AA-123-BB"
            className="h-28 md:h-32 text-5xl md:text-6xl text-center font-mono tracking-widest placeholder:text-gray-400
                       border-0 rounded-full shadow-2xl bg-white/95 backdrop-blur-md
                       focus:ring-4 focus:ring-blue-500/20 focus:outline-none pl-28 pr-80"
            autoFocus
            required
            pattern="[A-Z]{2}-[0-9]{3}-[A-Z]{2}"
          />
          {/* Loupe énorme et parfaitement centrée */}
          <Button className="absolute right-4 top-1/2 -translate-y-1/2 h-20 w-20 md:h-24 md:w-24 rounded-full bg-blue-900 hover:bg-blue-800 shadow-2xl">
            <Search className="h-12 w-12 md:h-14 md:w-14" />
          </Button>
        </div>
      </form>

      {/* 3 étapes – visibles sans scroll, élégantes et compactes */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-gray-600">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Camera className="h-7 w-7 text-gray-700" />
          </div>
          <span className="text-base md:text-lg font-medium">Preuve claire</span>
        </div>

        <div className="hidden md:block w-20 h-px bg-gray-300"></div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Shield className="h-7 w-7 text-gray-700" />
          </div>
          <span className="text-base md:text-lg font-medium">Vérification humaine</span>
        </div>

        <div className="hidden md:block w-20 h-px bg-gray-300"></div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Eye className="h-7 w-7 text-gray-700" />
          </div>
          <span className="text-base md:text-lg font-medium">Consultation volontaire</span>
        </div>
      </div>
    </main>
  );
}
