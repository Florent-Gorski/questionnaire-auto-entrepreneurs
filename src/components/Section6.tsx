import React from 'react';
import { MessageCircle, Lightbulb } from 'lucide-react';
import { FormData } from '../App';

interface Section6Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const Section6: React.FC<Section6Props> = ({ formData, updateFormData }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Informations complémentaires</h2>
      
      {/* Question 11 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <MessageCircle className="text-blue-500" size={24} />
          Avez-vous déjà utilisé des plateformes similaires ?
        </label>
        <textarea
          value={formData.plateformes}
          onChange={(e) => updateFormData({ plateformes: e.target.value })}
          placeholder="Ex : Startups.ch, IFJ, Udemy… Votre avis nous intéresse !"
          rows={3}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-slate-50"
        />
      </div>

      {/* Question 12 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-500" size={24} />
          Qu'ajouteriez-vous pour rendre cette plateforme unique ?
        </label>
        <textarea
          value={formData.suggestions}
          onChange={(e) => updateFormData({ suggestions: e.target.value })}
          placeholder="Partagez vos idées et suggestions pour nous aider à créer la plateforme de vos rêves..."
          rows={5}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-slate-50"
        />
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="text-blue-700 text-sm">
          📝 Ces questions sont optionnelles mais vos réponses nous aideront grandement à concevoir 
          une plateforme qui répond parfaitement à vos attentes.
        </p>
      </div>
    </div>
  );
};

export default Section6;