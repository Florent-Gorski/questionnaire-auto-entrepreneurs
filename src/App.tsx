import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Rocket, Users, FileText } from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Section6 from './components/Section6';
import ThankYou from './components/ThankYou';
import { supabase } from './lib/supabaseClient';

export interface FormData
{
  // Section 1
  statut: string;
  statutAutre: string;
  canton: string;

  // Section 2
  projet: string;
  projetSecteur: string;
  freins: string[];
  freinsAutre: string;

  // Section 3
  ressources: string[];
  ressourcesAutre: string;
  accompagnement: string;

  // Section 4
  fonctionnalites: string[];
  plateforme: string;

  // Section 5
  communication: string[];
  evenements: string;

  // Section 6
  plateformes: string;
  suggestions: string;
  email: string;
}

function App()
{
  const totalSections = 6;

  const [currentSection, setCurrentSection] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    statut: '',
    statutAutre: '',
    canton: '',
    projet: '',
    projetSecteur: '',
    freins: [],
    freinsAutre: '',
    ressources: [],
    ressourcesAutre: '',
    accompagnement: '',
    fonctionnalites: [],
    plateforme: '',
    communication: [],
    evenements: '',
    plateformes: '',
    suggestions: '',
    email: ''
  });

  const updateFormData = (updates: Partial<FormData>) =>
  {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextSection = async () =>
  {
    if (currentSection < totalSections - 1) {
      setCurrentSection(prev => prev + 1);
      return;
    }

    // Dernière étape : submit
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (supabase) {
        const payload = {
          statut: formData.statut,
          statut_autre: formData.statutAutre || null,
          canton: formData.canton || null,
          projet: formData.projet || null,
          projet_secteur: formData.projetSecteur || null,
          freins: formData.freins || [],
          freins_autre: formData.freinsAutre || null,
          ressources: formData.ressources || [],
          ressources_autre: formData.ressourcesAutre || null,
          accompagnement: formData.accompagnement || null,
          fonctionnalites: formData.fonctionnalites || [],
          plateforme: formData.plateforme || null,
          communication: formData.communication || [],
          evenements: formData.evenements || null,
          plateformes: formData.plateformes || null,
          suggestions: formData.suggestions || null,
          email: formData.email || null,
        };

        const { error } = await (supabase.from('questionnaire_responses').insert(payload));
        if (error) throw error;
      }
      setIsCompleted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l’envoi.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevSection = () =>
  {
    if (currentSection > 0) setCurrentSection(prev => prev - 1);
  };

  const canProceed = () =>
  {
    switch (currentSection) {
      case 0:
        return formData.statut !== '' && formData.canton !== '';
      case 1:
        return formData.projet !== '' && formData.projetSecteur !== '' && formData.freins.length > 0;
      case 2:
        return formData.ressources.length > 0 && formData.accompagnement !== '';
      case 3:
        return formData.fonctionnalites.length > 0 && formData.plateforme !== '';
      case 4:
        return formData.communication.length > 0 && formData.evenements !== '';
      case 5:
        return true; // section finale libre
      default:
        return false;
    }
  };

  const renderSection = () =>
  {
    const sectionProps = { formData, updateFormData };
    switch (currentSection) {
      case 0: return <Section1 {...sectionProps} />;
      case 1: return <Section2 {...sectionProps} />;
      case 2: return <Section3 {...sectionProps} />;
      case 3: return <Section4 {...sectionProps} />;
      case 4: return <Section5 {...sectionProps} />;
      case 5: return <Section6 {...sectionProps} />;
      default: return <Section1 {...sectionProps} />;
    }
  };

  if (isCompleted) {
    return <ThankYou formData={formData} updateFormData={updateFormData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-swiss-lake/10">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2">
              <span className="badge-swiss">🇨🇭 Suisse</span>
            </div>
            <div className="inline-flex items-center gap-3 text-swiss-blue mb-2">
              <Rocket className="text-swiss-red" />
              <span className="font-display font-semibold tracking-tight">Entrepreneuriat en Suisse</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900">
              Questionnaire d’étude de besoins
            </h1>
            <p className="mt-2 text-slate-600">
              Aidez-nous à bâtir une plateforme utile pour les (futurs) entrepreneurs en Suisse.
            </p>

            <div className="mt-4 inline-flex items-center gap-4 text-slate-500 text-sm">
              <span className="inline-flex items-center gap-1"><Users size={16} /> 3–5 min</span>
              <span className="inline-flex items-center gap-1"><FileText size={16} /> Anonyme</span>
            </div>

            <div className="mt-6">
              <ProgressBar currentSection={currentSection} totalSections={totalSections} />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            {renderSection()}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={prevSection}
                disabled={currentSection === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                Précédent
              </button>

              <div className="text-sm text-slate-600">
                Section {currentSection + 1} sur {totalSections}
              </div>

              {isSubmitting && (
                <div className="text-sm text-slate-500 mr-4">Envoi en cours…</div>
              )}
              {submitError && (
                <div className="text-sm text-red-600 mr-4">Une erreur est survenue : {submitError}</div>
              )}

              <button
                onClick={nextSection}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed
                           bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-sm"
              >
                {currentSection === totalSections - 1 ? 'Terminer' : 'Suivant'}
                {currentSection === totalSections - 1 ? <CheckCircle size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
