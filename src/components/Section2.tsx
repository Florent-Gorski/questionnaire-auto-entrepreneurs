import React from 'react';
import { FormData } from '../App';

interface Section2Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const Section2: React.FC<Section2Props> = ({ formData, updateFormData }) => {
  const projetOptions = [
    { value: 'oui', label: 'Oui', showSecteur: true },
    { value: 'pense', label: 'Non, mais j\'y pense sérieusement', showSecteur: false },
    { value: 'renseigne', label: 'Non, je me renseigne seulement', showSecteur: false }
  ];

  const freinsOptions = [
    'Manque de connaissances en gestion/comptabilité',
    'Difficulté à trouver des financements',
    'Complexité administrative',
    'Peur de l\'échec',
    'Manque de réseau',
    'Autre'
  ];

  const toggleFrein = (frein: string) => {
    const newFreins = formData.freins.includes(frein)
      ? formData.freins.filter(f => f !== frein)
      : [...formData.freins, frein];
    updateFormData({ freins: newFreins });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Projet entrepreneurial</h2>
      
      {/* Question 3 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Avez-vous déjà un projet concret de création d'entreprise ou d'auto-entreprise ?
        </label>
        <div className="space-y-3">
          {projetOptions.map((option) => (
            <div key={option.value}>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="projet"
                    value={option.value}
                    checked={formData.projet === option.value}
                    onChange={(e) => updateFormData({ projet: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    formData.projet === option.value
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-slate-300 hover:border-blue-400'
                  }`}>
                    {formData.projet === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1" />
                    )}
                  </div>
                </div>
                <span className="ml-3 text-slate-700 hover:text-slate-900 transition-colors">
                  {option.label}
                </span>
              </label>
              
              {option.showSecteur && formData.projet === 'oui' && (
                <div className="mt-3 ml-7">
                  <input
                    type="text"
                    placeholder="Précisez le secteur : ______"
                    value={formData.projetSecteur}
                    onChange={(e) => updateFormData({ projetSecteur: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question 4 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Quels sont vos principaux freins pour vous lancer ? (Plusieurs réponses possibles)
        </label>
        <div className="space-y-3">
          {freinsOptions.map((frein) => (
            <div key={frein}>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.freins.includes(frein)}
                    onChange={() => toggleFrein(frein)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    formData.freins.includes(frein)
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300 hover:border-blue-400'
                  }`}>
                    {formData.freins.includes(frein) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-3 text-slate-700 hover:text-slate-900 transition-colors">
                  {frein}
                </span>
              </label>
              
              {frein === 'Autre' && formData.freins.includes(frein) && (
                <div className="mt-3 ml-8">
                  <input
                    type="text"
                    placeholder="Précisez..."
                    value={formData.freinsAutre}
                    onChange={(e) => updateFormData({ freinsAutre: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;