import React, { useState } from 'react';
import { GripVertical, Monitor, Smartphone, Globe } from 'lucide-react';
import { FormData } from '../App';

interface Section4Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const Section4: React.FC<Section4Props> = ({ formData, updateFormData }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const fonctionnalitesOptions = [
    'Fiches pratiques téléchargeables',
    'Forum d\'entraide entre entrepreneurs',
    'Outils de gestion en ligne (facturation, trésorerie)',
    'Annonces de partenariats ou appels d\'offres',
    'Calendrier des événements'
  ];

  const plateformeOptions = [
    { value: 'francais', label: '100% en français', icon: '🇫🇷', description: 'Interface entièrement en français' },
    { value: 'allemand', label: 'Disponible en allemand', icon: '🇩🇪', description: 'Pour la Suisse alémanique' },
    { value: 'italien', label: 'Disponible en italien', icon: '🇮🇹', description: 'Pour le Tessin' },
    { value: 'romanche', label: 'Support du romanche', icon: '🏔️', description: 'Langue nationale suisse' },
    { value: 'mobile', label: 'Version mobile optimisée', icon: '📱', description: 'Application mobile dédiée' },
    { value: 'cantons', label: 'Informations par canton', icon: '🏛️', description: 'Spécificités cantonales' }
  ];

  const toggleFonctionnalite = (fonctionnalite: string) => {
    const newFonctionnalites = formData.fonctionnalites.includes(fonctionnalite)
      ? formData.fonctionnalites.filter(f => f !== fonctionnalite)
      : [...formData.fonctionnalites, fonctionnalite];
    updateFormData({ fonctionnalites: newFonctionnalites });
  };

  const togglePlateforme = (plateforme: string) => {
    const currentPlateformes = Array.isArray(formData.plateforme) 
      ? formData.plateforme 
      : formData.plateforme ? [formData.plateforme] : [];
    
    const newPlateformes = currentPlateformes.includes(plateforme)
      ? currentPlateformes.filter(p => p !== plateforme)
      : [...currentPlateformes, plateforme];
    
    updateFormData({ plateforme: newPlateformes.join(',') });
  };

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetItem: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newFonctionnalites = [...formData.fonctionnalites];
    const draggedIndex = newFonctionnalites.indexOf(draggedItem);
    const targetIndex = newFonctionnalites.indexOf(targetItem);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      newFonctionnalites.splice(draggedIndex, 1);
      newFonctionnalites.splice(targetIndex, 0, draggedItem);
      updateFormData({ fonctionnalites: newFonctionnalites });
    }

    setDraggedItem(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Attentes vis-à-vis de la plateforme</h2>
      
      {/* Question 7 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Quelles fonctionnalités jugeriez-vous indispensables ? (Sélectionnez et classez par ordre d'importance)
        </label>
        <div className="space-y-3">
          {fonctionnalitesOptions.map((fonctionnalite) => {
            const isSelected = formData.fonctionnalites.includes(fonctionnalite);
            return (
              <div
                key={fonctionnalite}
                draggable={isSelected}
                onDragStart={(e) => handleDragStart(e, fonctionnalite)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, fonctionnalite)}
                className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => toggleFonctionnalite(fonctionnalite)}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleFonctionnalite(fonctionnalite)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-3 flex-1 text-slate-700">
                  {fonctionnalite}
                </span>
                {isSelected && (
                  <>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                      #{formData.fonctionnalites.indexOf(fonctionnalite) + 1}
                    </span>
                    <GripVertical className="text-slate-400" size={16} />
                  </>
                )}
              </div>
            );
          })}
        </div>
        {formData.fonctionnalites.length > 0 && (
          <p className="text-sm text-slate-600 mt-2">
            💡 Glissez-déposez les éléments sélectionnés pour les classer par ordre d'importance
          </p>
        )}
      </div>

      {/* Question 8 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Quelles caractéristiques souhaiteriez-vous pour la plateforme ? (Plusieurs réponses possibles)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plateformeOptions.map((option) => {
            const currentPlateformes = Array.isArray(formData.plateforme) 
              ? formData.plateforme 
              : formData.plateforme ? formData.plateforme.split(',') : [];
            const isSelected = currentPlateformes.includes(option.value);
            
            return (
              <label 
                key={option.value} 
                className={`flex flex-col cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  isSelected 
                    ? 'bg-red-50 border-red-200 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => togglePlateforme(option.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center mr-3 ${
                        isSelected
                          ? 'bg-red-500 border-red-500'
                          : 'border-slate-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-2xl mr-2">{option.icon}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800 block mb-1">
                      {option.label}
                    </span>
                    <span className="text-sm text-slate-600">
                      {option.description}
                    </span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🇨🇭</span>
            <span className="font-medium text-red-800">Spécificités suisses</span>
          </div>
          <p className="text-sm text-red-700">
            La Suisse compte 4 langues nationales et 26 cantons avec leurs propres spécificités juridiques et administratives. 
            Vos préférences nous aideront à créer une plateforme adaptée à la diversité helvétique.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section4;