'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Holiday } from '../holidays/HolidayList';
import { X } from 'lucide-react';

interface HolidayFormProps {
  holiday?: Holiday | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function HolidayForm({ holiday, onClose, onSuccess }: HolidayFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: holiday?.name || '',
    date_value: holiday?.date_value || '',
    category: holiday?.category || 'Civil',
    description: holiday?.description || '',
    is_published: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (holiday) {
        // Update
        const { error } = await supabase
          .from('holidays')
          .update(formData)
          .eq('id', holiday.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('holidays')
          .insert([formData]);
        if (error) throw error;
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving holiday:', error);
      alert('Erreur lors de l\'enregistrement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-wh/10 bg-ink2 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-head text-xl font-bold text-wh">
            {holiday ? 'Modifier' : 'Ajouter'} un jour férié
          </h2>
          <button onClick={onClose} className="text-muted hover:text-wh">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-mono uppercase text-muted">Nom</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-wh/10 bg-wh/5 px-4 py-2 text-sm text-wh focus:border-g focus:outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-mono uppercase text-muted">Date</label>
              <input
                type="date"
                required
                className="w-full rounded-lg border border-wh/10 bg-wh/5 px-4 py-2 text-sm text-wh focus:border-g focus:outline-none"
                value={formData.date_value}
                onChange={(e) => setFormData({ ...formData, date_value: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-mono uppercase text-muted">Catégorie</label>
              <select
                className="w-full rounded-lg border border-wh/10 bg-wh/5 px-4 py-2 text-sm text-wh focus:border-g focus:outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              >
                <option value="Civil">Civil</option>
                <option value="National">National</option>
                <option value="Religieux">Religieux</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-mono uppercase text-muted">Description</label>
            <textarea
              className="h-24 w-full rounded-lg border border-wh/10 bg-wh/5 px-4 py-2 text-sm text-wh focus:border-g focus:outline-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-g py-3 font-head font-bold text-wh transition-all hover:bg-g-d disabled:opacity-50"
          >
            {loading ? 'Chargement...' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  );
}
