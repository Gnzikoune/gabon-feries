'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Holiday } from '@/components/holidays/HolidayList';
import HolidayForm from '@/components/admin/HolidayForm';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);

  const fetchHolidays = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('holidays')
      .select('*')
      .order('date_value', { ascending: true });
    
    if (data) setHolidays(data as Holiday[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce jour férié ?')) {
      const { error } = await supabase.from('holidays').delete().eq('id', id);
      if (error) alert('Erreur lors de la suppression');
      else fetchHolidays();
    }
  };

  return (
    <div className="min-h-screen bg-ink p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2 text-xs font-medium text-muted hover:text-wh">
              <ArrowLeft size={14} /> Retour au site
            </Link>
            <h1 className="font-head text-3xl font-bold text-wh">Dashboard Admin</h1>
            <p className="text-sm text-muted">Gérez les jours fériés officiels du Gabon.</p>
          </div>
          <button
            onClick={() => {
              setEditingHoliday(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-g px-5 py-2.5 font-head font-bold text-wh transition-all hover:bg-g-d"
          >
            <Plus size={18} /> Ajouter
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-wh/10 bg-wh/2">
          <table className="w-full text-left text-sm text-wh">
            <thead className="bg-wh/5 font-mono text-[10px] uppercase tracking-wider text-muted">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Nom</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wh/5">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-muted">Chargement...</td></tr>
              ) : holidays.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-muted">Aucun jour férié trouvé.</td></tr>
              ) : (
                holidays.map((h) => (
                  <tr key={h.id} className="transition-colors hover:bg-wh/3">
                    <td className="px-6 py-4 font-mono text-xs">
                      {new Date(h.date_value).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 font-semibold">{h.name}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                        h.category === 'National' ? 'text-g' : h.category === 'Religieux' ? 'text-y' : 'text-b'
                      }`}>
                        {h.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingHoliday(h);
                            setIsFormOpen(true);
                          }}
                          className="rounded-lg p-2 text-muted hover:bg-wh/5 hover:text-wh"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(h.id)}
                          className="rounded-lg p-2 text-muted hover:bg-r/10 hover:text-r"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <HolidayForm
          holiday={editingHoliday}
          onClose={() => setIsFormOpen(false)}
          onSuccess={fetchHolidays}
        />
      )}
    </div>
  );
}
