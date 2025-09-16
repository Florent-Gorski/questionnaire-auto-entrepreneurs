import React, { useState } from 'react';
import { CheckCircle2, Mail, Heart } from 'lucide-react';
import { FormData } from '../App';

interface ThankYouProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ formData, updateFormData }) => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
    // Ici vous pourriez envoyer l'email à votre backend
    console.log('Données du formulaire:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
          {/* Header avec animation */}
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-8 text-white text-center">
            <div className="inline-block p-3 bg-white/20 rounded-full mb-4">
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Merci pour votre participation !</h1>
            <p className="text-emerald-100 text-lg">
              Votre contribution est précieuse pour façonner l'avenir de l'entrepreneuriat en Suisse
            </p>
          </div>

          {/* Contenu principal */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-red-500" size={24} />
              <span className="text-lg text-slate-700">
                Vos réponses nous aident à créer une plateforme qui vous ressemble
              </span>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-3">📊 Récapitulatif de vos réponses :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <strong>Statut :</strong> {formData.statut}
                </div>
                <div>
                  <strong>Canton :</strong> {formData.canton}
                </div>
                <div>
                  <strong>Projet :</strong> {formData.projet === 'oui' ? 'Oui' : formData.projet === 'pense' ? 'Y pense' : 'Se renseigne'}
                </div>
                <div>
                  <strong>Budget accompagnement :</strong> {formData.accompagnement || 'Non spécifié'}
                </div>
                <div className="md:col-span-2">
                  <strong>Préférences plateforme :</strong> {
                    formData.plateforme 
                      ? formData.plateforme.split(',').length + ' option(s) sélectionnée(s)'
                      : 'Aucune sélectionnée'
                  }
                </div>
                <div className="md:col-span-2">
                  <strong>Ressources recherchées :</strong> {formData.ressources.length} type(s)
                </div>
                <div className="md:col-span-2">
                  <strong>Canaux de communication :</strong> {formData.communication.join(', ') || 'Aucun sélectionné'}
                </div>
              </div>
            </div>

            {/* Collecte email */}
            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="text-blue-500" size={24} />
                  <h3 className="text-lg font-semibold text-slate-800">
                    Restez informé(e) du lancement !
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Laissez votre email pour être parmi les premiers à découvrir notre plateforme 
                  et bénéficier d'offres exclusives de lancement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    M'informer
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Optionnel - Nous respectons votre vie privée et ne partagerons jamais vos données.
                </p>
              </form>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                <CheckCircle2 className="mx-auto text-emerald-500 mb-3" size={32} />
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                  Email enregistré avec succès !
                </h3>
                <p className="text-emerald-700">
                  Nous vous contacterons dès que notre plateforme sera disponible.
                </p>
              </div>
            )}

            {/* Message de clôture */}
            <div className="text-center mt-8 pt-8 border-t border-slate-200">
              <p className="text-slate-600 mb-2">
                🚀 Ensemble, construisons l'écosystème entrepreneurial suisse de demain !
              </p>
              <p className="text-sm text-slate-500">
                Temps de réponse moyen : {Math.floor(Math.random() * 2) + 4} minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;