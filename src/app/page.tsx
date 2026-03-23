import { GABON_HOLIDAYS } from "@/lib/data/holidays";

export default function Home() {
  const nextHoliday = GABON_HOLIDAYS[1]; // Approximation for demo

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-12 md:px-10 md:pt-24 md:pb-20">
        <div className="absolute top-[-100px] right-[-100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,184,122,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[-80px] left-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(245,196,0,0.07)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-1">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-g/25 bg-g/10 px-3 py-1 font-mono text-[11px] font-medium tracking-[1.5px] uppercase text-g">
            <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-g" />
            Gabon Fériés 2026
          </div>
          
          <h1 className="font-head text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] tracking-tight mb-5 max-w-[700px]">
            Planifiez vos <span className="text-g">moments</span>, célébrez notre <span className="text-y">culture</span>.
          </h1>
          
          <p className="max-w-[560px] text-lg leading-relaxed text-wh/55 mb-9">
            Le guide officiel et interactif de tous les jours fériés au Gabon. Ne manquez plus aucune célébration nationale, civile ou religieuse.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-head text-3xl font-bold leading-none text-wh">11</span>
              <span className="font-mono text-[11px] tracking-wider uppercase text-muted">Jours Fériés</span>
            </div>
            <div className="h-10 w-px self-stretch bg-wh/10" />
            <div className="flex flex-col gap-1">
              <span className="font-head text-3xl font-bold leading-none text-wh">3</span>
              <span className="font-mono text-[11px] tracking-wider uppercase text-muted">Ponts Idéaux</span>
            </div>
            <div className="h-10 w-px self-stretch bg-wh/10" />
            <div className="flex flex-col gap-1">
              <span className="font-head text-3xl font-bold leading-none text-g">Prochain</span>
              <span className="font-mono text-[11px] tracking-wider uppercase text-muted">{nextHoliday.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Grid - Sprint 1 continuation */}
      <section id="calendrier" className="px-6 pb-20 md:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-head text-2xl font-bold text-wh">Calendrier 2026</h2>
            <p className="text-sm text-muted">La liste complète chronologique des festivités.</p>
          </div>
          <button className="text-xs font-semibold text-g hover:underline">Voir tout</button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GABON_HOLIDAYS.map((h) => (
            <div key={h.id} className="group relative overflow-hidden rounded-xl border border-wh/7 bg-wh/2 p-5 transition-all hover:-translate-y-1 hover:border-wh/12 hover:bg-wh/5">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-g/50 transition-colors" />
              
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] font-medium text-muted">{h.date}</span>
                <span className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                  h.category === 'National' ? 'bg-g/20 text-g border border-g/30' :
                  h.category === 'Religieux' ? 'bg-y/20 text-y border border-y/30' :
                  'bg-b/20 text-b border border-b/30'
                }`}>
                  {h.category}
                </span>
              </div>
              
              <h3 className="mb-2 font-head text-sm font-semibold text-wh">{h.name}</h3>
              <p className="mb-4 text-xs leading-relaxed text-wh/45 line-clamp-2">{h.description}</p>
              
              <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-medium text-muted hover:text-wh cursor-pointer">Détails →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
