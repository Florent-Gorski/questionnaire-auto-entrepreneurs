import React from 'react';
import { FormData } from '../App';

interface Section1Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const cantons = [
  'Appenzell Rhodes-Extérieures', 'Appenzell Rhodes-Intérieures', 'Argovie', 'Bâle-Campagne',
  'Bâle-Ville', 'Berne', 'Fribourg', 'Genève', 'Glaris', 'Grisons', 'Jura', 'Lucerne',
  'Neuchâtel', 'Nidwald', 'Obwald', 'Saint-Gall', 'Schaffhouse', 'Schwyz', 'Soleure',
  'Tessin', 'Thurgovie', 'Uri', 'Valais', 'Vaud', 'Zoug', 'Zurich'
];

const Section1: React.FC<Section1Props> = ({ formData, updateFormData }) => {
  const statusOptions = [
    'Salarié(e)',
    'Étudiant(e)',
    'Chômeur(se)',
    'Auto-entrepreneur(e) débutant(e)',
    'Autre'
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Profil du répondant</h2>
      
      {/* Question 1 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Quel est votre statut actuel ?
        </label>
        <div className="space-y-3">
          {statusOptions.map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="radio"
                  name="statut"
                  value={option}
                  checked={formData.statut === option}
                  onChange={(e) => updateFormData({ statut: e.target.value })}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  formData.statut === option
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-slate-300 hover:border-blue-400'
                }`}>
                  {formData.statut === option && (
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1" />
                  )}
                </div>
              </div>
              <span className="ml-3 text-slate-700 hover:text-slate-900 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
        
        {formData.statut === 'Autre' && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Précisez..."
              value={formData.statutAutre}
              onChange={(e) => updateFormData({ statutAutre: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        )}
      </div>

      {/* Question 2 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Dans quel canton résidez-vous ?
        </label>
        <select
          value={formData.canton}
          onChange={(e) => updateFormData({ canton: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
        >
          <option value="">Sélectionnez votre canton</option>
          {cantons.map((canton) => (
            <option key={canton} value={canton}>
              {canton}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Section1;