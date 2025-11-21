// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import UserMenu from "@/components/UserMenu";        // ← Menu haut droite
import LegalFooter from "@/components/LegalFooter";  // ← Footer légal

export const metadata = {
  title: "Taplak – La réputation routière en France",
  description: "Score et signalements de conduite par plaque d’immatriculation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 pb-24 relative">
          {children}
          <UserMenu />          {/* ← Menu utilisateur en haut à droite */}
        </main>
        <LegalFooter />         {/* ← Footer légal fixe en bas */}
      </body>
    </html>
  );
}
