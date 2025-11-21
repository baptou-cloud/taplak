export default function ConduitePage() {
  const conseils = [
    "Respecter les limitations de vitesse",
    "Garder ses distances de sécurité",
    "Ne jamais utiliser son téléphone au volant",
    "Mettre son clignotant à chaque changement de direction",
    "Laisser passer les piétons aux passages cloutés",
    "Ne pas griller les feux orange/rouge",
    "Rester zen même en cas de bouchon",
    "Céder le passage quand c’est à vous de le faire",
    "Éviter les queues de poisson",
    "Respecter les cyclistes (1,5 m minimum)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-black text-center mb-4">Optimiser ma conduite</h1>
        <p className="text-xl text-center text-slate-600 mb-12">Les 10 règles d’or pour garder un score 100 sur Taplak</p>

        <div className="grid gap-6">
          {conseils.map((c, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-xl flex items-center gap-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl font-black text-green-600">
                {i + 1}
              </div>
              <p className="text-xl font-medium">{c}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-slate-600">
            Sources : Sécurité Routière · Prévention Routière · Code de la Route
          </p>
        </div>
      </div>
    </div>
  );
}
