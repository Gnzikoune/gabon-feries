'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface Holiday {
  id: string;
  name: string;
  date_value: string;
  category: "Civil" | "National" | "Religieux" | "Mobile";
  description: string;
}

interface HolidayListProps {
  initialHolidays: Holiday[];
}

export default function HolidayList({ initialHolidays }: HolidayListProps) {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);

  useEffect(() => {
    // Écouter les changements en temps réel
    const channel = supabase
      .channel('public:holidays')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'holidays' },
        async (payload) => {
          // Re-fetch everything for simplicity and consistency with sorting
          const { data } = await supabase
            .from('holidays')
            .select('*')
            .eq('is_published', true)
            .order('date_value', { ascending: true });
          
          if (data) setHolidays(data as Holiday[]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {holidays.map((h) => (
        <div key={h.id} className="group relative overflow-hidden rounded-xl border border-wh/7 bg-wh/2 p-5 transition-all hover:-translate-y-1 hover:border-wh/12 hover:bg-wh/5">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-g/50 transition-colors" />
          
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] font-medium text-muted">
              {new Date(h.date_value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </span>
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
  );
}
