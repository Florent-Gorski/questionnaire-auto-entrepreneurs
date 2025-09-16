import { ChangeEvent } from 'react';
import type { FormData } from '../App';

type Props = {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
};

const FREINS = [
  'Manque de connaissances en gestion/comptabilité',
  'Difficulté à trouver des financements',
  'Complexité administrative',
  'Peur de l’échec',
  'Manque de réseau',
  'Autre'
];

export default function Section2({ formData, updateFormData }: Props)
{
  const handleProjet = (e: ChangeEvent<HTMLTextAreaElement>) =>
    updateFormData({ projet: e.target.value });

  const handleSecteur = (e: ChangeEvent<HTMLInputElement>) =>
    updateFormData({ projetSecteur: e.target.value });

  const toggleFrein = (f: string) =>
  {
    const current = Array.isArray(formData.freins) ? formData.freins : [];
    updateFormData({
      freins: current.includes(f)
        ? current.filter(v => v !== f)
        : [...current, f],
    });
  };

  return (
    <div className="space-y-8">
      {/* Projet */}
      <div>
        <h2 className="text-xl font-display font-semibold text-slate-900">
          Décris ton projet
        </h2>
        <textarea
          className="mt-3 w-full min-h-[100px] rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-swiss-red/40"
          placeholder="Ex. Coaching pour indépendants, boutique en ligne..."
          value={formData.projet}
          onChange={handleProjet}
        />
      </div>

      {/* Secteur (optionnel mais affiché clairement) */}
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Secteur principal (optionnel)
        </h3>
        <input
          type="text"
          className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-swiss-red/40"
          placeholder="Ex. Services, commerce, artisanat..."
          value={formData.projetSecteur}
          onChange={handleSecteur}
        />
        <p className="mt-1 text-xs text-slate-500">
          Facultatif — ne bloque pas la suite
        </p>
      </div>

      {/* Freins */}
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Quels sont tes principaux freins ?
        </h3>
        <p className="mt-1 text-sm text-slate-600">Coche au moins un.</p>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FREINS.map(f => (
            <label
              key={f}
              className="flex items-center gap-3 rounded-xl border px-4 py-3 hover:bg-slate-50 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={formData.freins.includes(f)}
                onChange={() => toggleFrein(f)}
              />
              <span className="text-sm text-slate-800">{f}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
