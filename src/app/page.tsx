// src/app/page.tsx – copie-colle ça à la place de ton ancienne page d’accueil
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, Camera, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-6 pt-20 pb-32">
      
      {/* Titre + barre de recherche énorme centrée */}
      <div className="w-full max-w-3xl text-center space-y-10">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
          Taplak
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Application citoyenne permettant de signaler de manière anonyme et vérifiée<br />
          un comportement dangereux sur la route, grâce à la plaque d’immatriculation.
        </p>

        {/* Barre de recherche GÉANTE (comme avant, mais encore plus propre) */}
        <form action="/p" className="mt-12">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <Input
              name="plaque"
              placeholder="AA-123-BB"
              className="h-20 text-3xl text-center sm:text-left font-mono tracking-wider border-4 border-gray-300 focus:border-blue-900 rounded-2xl shadow-inner"
              required
              pattern="[A-Z]{2}-[0-9]{3}-[A-Z]{2}"
              autoFocus
            />
            <Button size="lg" className="h-20 px-16 text-xl font-semibold bg-blue-900 hover:bg-blue-800 rounded-2xl">
              <Search className="mr-3 h-7 w-7" />
              Rechercher
            </Button>
          </div>
        </form>

        {/* Stats intégrées proprement, sans source en gros */}
        <p className="text-lg text-gray-600 mt-16 max-w-2xl mx-auto">
          En France, plus de <strong>3 400 personnes</strong> meurent chaque année sur la route<br />
          et plus de <strong>70 000</strong> sont gravement blessées.<br />
          <span className="text-sm text-gray-500">ONISR – Sécurité routière, 2024</span>
        </p>
      </div>

      {/* Fonctionnement – 3 étapes sobres et élégantes */}
      <div className="w-full max-w-5xl mx-auto mt-32 grid md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
            <Camera className="h-10 w-10 text-blue-900" />
          </div>
          <h3 className="text-xl font-semibold mb-3">1. Prise de preuve</h3>
          <p className="text-gray-700">Photo ou vidéo claire de la plaque et du contexte</p>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
            <Shield className="h-10 w-10 text-blue-900" />
          </div>
          <h3 className="text-xl font-semibold mb-3">2. Vérification humaine</h3>
          <p className="text-gray-700">Chaque signalement est examiné avant publication</p>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-blue-900" />
          </div>
          <h3 className="text-xl font-semibold mb-3">3. Consultation volontaire</h3>
          <p className="text-gray-700">Le conducteur peut consulter son score à tout moment</p>
        </div>
      </div>

      {/* Bouton final discret mais présent */}
      <div className="mt-20">
        <Button asChild size="lg" className="text-lg px-12 h-14 bg-blue-900 hover:bg-blue-800">
          <Link href="/p/nouveau">Effectuer un signalement</Link>
        </Button>
      </div>
    </main>
  );
}
