// src/app/page.tsx – à remplacer entièrement
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, Camera, CheckCircle, Search } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Héro */}
      <section className="pt-24 pb-20 px-6 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            La réputation routière en France
          </h1>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Chaque année, plus de 3 400 personnes perdent la vie sur les routes françaises<br />
            et plus de 70 000 sont gravement blessées.<br />
            <span className="text-sm text-gray-500">(Source : ONISR – Observatoire national interministériel de la sécurité routière, 2024)</span>
          </p>

          <p className="text-lg text-gray-800 mb-12 max-w-2xl mx-auto">
            Taplak est une application citoyenne qui permet de signaler anonymement et de manière vérifiée<br />
            un comportement dangereux sur la route, grâce à la plaque d’immatriculation.
          </p>

          {/* Champ de recherche géant */}
          <form action="/p" className="max-w-2xl mx-auto mb-16">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                name="plaque"
                placeholder="AA-123-BB"
                className="text-2xl h-16 text-center sm:text-left border-2 border-gray-300 focus:border-blue-900 rounded-xl"
                required
                pattern="[A-Z]{2}-[0-9]{3}-[A-Z]{2}"
              />
              <Button size="lg" className="h-16 px-12 text-lg bg-blue-900 hover:bg-blue-800">
                <Search className="mr-2 h-5 w-5" /> Rechercher
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Comment ça fonctionne – ton très soutenu */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Fonctionnement du service
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="p-8 text-center border-0 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Camera className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Signalement avec preuve</h3>
              <p className="text-gray-700">
                Vous êtes témoin d’un comportement dangereux ?<br />
                Prenez une photo ou vidéo claire de la plaque et du contexte.
              </p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Vérification humaine</h3>
              <p className="text-gray-700">
                Chaque signalement est examiné par notre équipe de modération<br />
                avant toute publication. Aucune donnée personnelle n’est diffusée.
              </p>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Consultation volontaire</h3>
              <p className="text-gray-700">
                Le conducteur peut consulter son score à tout moment<br />
                et prendre connaissance des signalements validés.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Appel final */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xl text-gray-800 mb-8">
            Objectif : encourager une conduite plus responsable<br />
            par la transparence et la pression sociale positive.
          </p>
          <Button asChild size="lg" className="bg-blue-900 hover:bg-blue-800 text-lg px-12">
            <Link href="/p/nouveau">Effectuer un signalement</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
