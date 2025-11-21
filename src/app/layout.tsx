import "./globals.css";
import Header from "@/components/Header";
import UserMenu from "@/components/UserMenu";  // ← AJOUTÉ

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
      <body className="bg-slate-50 min-h-screen">
        <Header />
        <main className="pt-20 relative">
          {children}
          {/* Menu déroulant utilisateur (visible seulement quand connecté) */}
          <UserMenu />
        </main>
      </body>
    </html>
  );
}
