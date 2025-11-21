import "./globals.css";
import UserMenu from "@/components/UserMenu";

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
        {/* On vire complètement le Header qui cachait le menu */}
        <main className="pt-6 relative">
          {children}
          <UserMenu />
        </main>
      </body>
    </html>
  );
}
