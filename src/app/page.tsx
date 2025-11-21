import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Camera, Shield, Eye } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col justify-center px-5 py-16">

      {/* Titre – parfait sur mobile */}
      <div className="text-center mb-10">
        <h1 
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-gray-900 leading-none"
          style={{ 
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
            letterSpacing: "-0.03em"
          }}
        >
          Taplak
        </h1>

        <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-600 font-light leading-relaxed">
          Signalement anonyme et vérifié<br className="sm:hidden" /> des comportements dangereux
        </p>
      </div>

      {/* Barre de recherche – énorme même sur petit écran */}
      <form
  onSubmit={(e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("plaque") as HTMLInputElement;
    const value = input.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(value)) {
      const formatted = value.replace(/([A-Z]{2})(\d{3})([A-Z]{2})/, "$1-$2-$3");
      window.location.href = `/p/${formatted}`;
    }
  }}
  className="w-full max-w-4xl"
>
  <div className="relative">
    <Input
      name="plaque"
      placeholder="AA-123-BB"
      className="h-32 md:h-36 text-5xl md:text-6xl text-center font-mono tracking-widest placeholder:text-gray-400
                 border-0 rounded-full shadow-2xl bg-white/95 backdrop-blur-md
                 focus:ring-4 focus:ring-blue-500/20 focus:outline-none pl-28 pr-80"
      required
      autoFocus
    />
    <Button
      type="submit"
      className="absolute right-5 top-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-blue-900 hover:bg-blue-800 shadow-2xl"
    >
      <Search className="h-12 w-12" />
    </Button>
  </div>
</form>

      {/* 3 étapes – vertical sur mobile, horizontal sur grand écran */}
      <div className="space-y-8 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:gap-8 md:gap-16 text-gray-600">
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Camera className="h-6 w-6 text-gray-700" />
          </div>
          <span className="text-base font-medium">Preuve claire</span>
        </div>

        <div className="hidden sm:block w-16 md:w-20 h-px bg-gray-300"></div>
        <div className="sm:hidden w-px h-12 bg-gray-300 mx-auto"></div>

        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-gray-700" />
          </div>
          <span className="text-base font-medium">Vérification humaine</span>
        </div>

        <div className="hidden sm:block w-16 md:w-20 h-px bg-gray-300"></div>
        <div className="sm:hidden w-px h-12 bg-gray-300 mx-auto"></div>

        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Eye className="h-6 w-6 text-gray-700" />
          </div>
          <span className="text-base font-medium">Consultation volontaire</span>
        </div>
      </div>
    </main>
  );
}
