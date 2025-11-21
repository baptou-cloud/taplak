export default function LegalFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 py-4">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
        <p>© 2025 Taplak – Tous droits réservés</p>
        <div className="flex gap-6 mt-2 sm:mt-0">
          <a href="/about" className="hover:text-slate-900">À propos</a>
          <a href="/contact" className="hover:text-slate-900">Contact</a>
          <a href="/legal" className="hover:text-slate-900">Mentions légales</a>
        </div>
      </div>
    </footer>
  );
}
