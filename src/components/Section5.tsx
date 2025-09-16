import React from 'react';
import { Mail, Linkedin, Facebook, Instagram, Headphones, Monitor, Building } from 'lucide-react';
import { FormData } from '../App';

interface Section5Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const Section5: React.FC<Section5Props> = ({ formData, updateFormData }) => {
  const communicationOptions = [
    { value: 'newsletter', label: 'Newsletter', icon: Mail },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { value: 'facebook', label: 'Facebook', icon: Facebook },
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'podcasts', label: 'Podcasts ou vidéos YouTube', icon: Headphones },
    { value: 'medias', label: 'Partenariats avec des médias locaux', icon: Building }
  ];

  const evenementsOptions = [
    { value: 'enligne', label: 'Oui, en ligne', icon: Monitor },
    { value: 'presentiel', label: 'Oui, en présentiel', icon: Building },
    { value: 'non', label: 'Non', icon: null }
  ];

  const toggleCommunication = (communication: string) => {
    const newCommunication = formData.communication.includes(communication)
      ? formData.communication.filter(c => c !== communication)
      : [...formData.communication, communication];
    updateFormData({ communication: newCommunication });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Communication</h2>
      
      {/* Question 9 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Par quel canal préféreriez-vous être informé(e) ? (Plusieurs réponses possibles)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {communicationOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <label
                key={option.value}
                className="flex items-center cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 hover:bg-slate-50"
                style={{
                  borderColor: formData.communication.includes(option.value) ? '#3B82F6' : '#E2E8F0',
                  backgroundColor: formData.communication.includes(option.value) ? '#EBF8FF' : 'white'
                }}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.communication.includes(option.value)}
                    onChange={() => toggleCommunication(option.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    formData.communication.includes(option.value)
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300'
                  }`}>
                    {formData.communication.includes(option.value) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <IconComponent 
                  className={`ml-3 mr-3 ${
                    option.value === 'linkedin' ? 'text-blue-600' :
                    option.value === 'facebook' ? 'text-blue-500' :
                    option.value === 'instagram' ? 'text-pink-500' :
                    option.value === 'podcasts' ? 'text-red-500' :
                    'text-blue-500'
                  }`} 
                  size={20} 
                />
                <span className="text-slate-700 font-medium">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Question 10 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-slate-700 mb-4">
          Seriez-vous intéressé(e) par des événements ?
        </label>
        <div className="space-y-3">
          {evenementsOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <label key={option.value} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="relative">
                  <input
                    type="radio"
                    name="evenements"
                    value={option.value}
                    checked={formData.evenements === option.value}
                    onChange={(e) => updateFormData({ evenements: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    formData.evenements === option.value
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-slate-300 hover:border-blue-400'
                  }`}>
                    {formData.evenements === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1" />
                    )}
                  </div>
                </div>
                {IconComponent && <IconComponent className="ml-3 mr-3 text-blue-500" size={20} />}
                {!IconComponent && <div className="ml-3 mr-3 w-5 h-5" />}
                <span className="text-slate-700 hover:text-slate-900 transition-colors">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section5;