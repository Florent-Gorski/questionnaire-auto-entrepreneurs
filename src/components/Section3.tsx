import React from 'react';
import { FileText, Video, Calculator, Users, BookOpen } from 'lucide-react';
import { FormData } from '../App';

interface Section3Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const Section3: React.FC<Section3Props> = ({ formData, updateFormData }) => {
  const ressourcesOptions = [
    { value: 'guides', label: 'Guides pratiques (business plan, statut juridique, etc.)', icon: FileText },
    { value: 'formations', label: 'Formations en ligne (vidéos, webinaires)', icon: Video },
    { value: 'outils', label: 'Outils interactifs (simulateurs de coûts, modèles de contrats)', icon: Calculator },
    { value: 'reseau', label: 'Accès à un réseau d\'entrepreneurs ou de mentors', icon: Users },
    { value: 'annuaire', label: 'Annuaire de prestataires (comptables, juristes, etc.)', icon: BookOpen },
    { value: 'autre', label: 'Autre', icon: FileText }
  ];

  const accompagnementOptions = [
    'Oui, jusqu\'à 100 CHF',
    'Oui, entre 100 et 300 CHF', 
    'Oui, plus de 300 CHF',
    'Non, je préfère des ressources gratuites'
  ];

  const toggleRessource = (ressource: string) => {
    const newRessources = formData.ressources.includes(ressource)
      ? formData.ressources.filter(r => r !== ressource)
      : [...formData.ressources, ressource];
    updateFormData({ ressources: newRessources });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Besoins en ressources</h2>
      
      {/* Question 5 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Quels types de ressources recherchez-vous ? (Plusieurs réponses possibles)
        </label>
        <div className="space-y-3">
          {ressourcesOptions.map((ressource) => {
            const IconComponent = ressource.icon;
            return (
              <div key={ressource.value}>
                <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.ressources.includes(ressource.value)}
                      onChange={() => toggleRessource(ressource.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      formData.ressources.includes(ressource.value)
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-300 hover:border-blue-400'
                    }`}>
                      {formData.ressources.includes(ressource.value) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <IconComponent className="ml-3 mr-3 text-blue-500" size={20} />
                  <span className="text-slate-700 hover:text-slate-900 transition-colors">
                    {ressource.label}
                  </span>
                </label>
                
                {ressource.value === 'autre' && formData.ressources.includes(ressource.value) && (
                  <div className="mt-3 ml-11">
                    <input
                      type="text"
                      placeholder="Précisez..."
                      value={formData.ressourcesAutre}
                      onChange={(e) => updateFormData({ ressourcesAutre: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Question 6 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Seriez-vous prêt(e) à payer pour un accompagnement personnalisé ?
        </label>
        <div className="space-y-3">
          {accompagnementOptions.map((option) => (
            <label key={option} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="relative">
                <input
                  type="radio"
                  name="accompagnement"
                  value={option}
                  checked={formData.accompagnement === option}
                  onChange={(e) => updateFormData({ accompagnement: e.target.value })}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  formData.accompagnement === option
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-slate-300 hover:border-blue-400'
                }`}>
                  {formData.accompagnement === option && (
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
      </div>
    </div>
  );
};

export default Section3;