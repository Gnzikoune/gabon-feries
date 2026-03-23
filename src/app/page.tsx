import { supabase } from "@/lib/supabase";
import HolidayList, { Holiday } from "@/components/holidays/HolidayList";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch initial data from Supabase (Server Side)
  const { data } = await supabase
    .from('holidays')
    .select('*')
    .eq('is_published', true)
    .order('date_value', { ascending: true });

  const initialHolidays = (data || []) as Holiday[];
  const nextHoliday = initialHolidays.find(h => new Date(h.date_value) >= new Date()) || initialHolidays[0];

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
              <span className="font-head text-3xl font-bold leading-none text-wh">{initialHolidays.length}</span>
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
              <span className="font-mono text-[11px] tracking-wider uppercase text-muted">{nextHoliday?.name || "À venir"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Grid Section */}
      <section id="calendrier" className="px-6 pb-20 md:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-head text-2xl font-bold text-wh">Calendrier 2026</h2>
            <p className="text-sm text-muted">La liste complète chronologique des festivités.</p>
          </div>
          <button className="text-xs font-semibold text-g hover:underline">Voir tout</button>
        </div>

        {/* Real-time Client Component */}
        <HolidayList initialHolidays={initialHolidays} />
      </section>
    </div>
  );
}
