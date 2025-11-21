// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import UserFooter from "@/components/UserFooter";  // ← Nouveau composant

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
        <main className="flex-1 pt-20 pb-24">{children}</main>
        {/* Footer fixe avec le menu utilisateur */}
        <UserFooter />
      </body>
    </html>
  );
}
