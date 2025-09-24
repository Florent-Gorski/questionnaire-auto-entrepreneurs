import { useEffect } from 'react';

const ThankYou = () =>
{
  useEffect(() =>
  {
    // Récupère les données depuis localStorage
    const data = JSON.parse(localStorage.getItem('questionnaire') || '{}');

    // Crée un formulaire caché dynamiquement
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://script.google.com/macros/s/AKfycbyb7NIaeLorAb4OA_Ny4KnGmBKJrGl0jmMlXhJBvwvspC7Suu-AzsBO8c6106R8BRenfA/exec';
    form.style.display = 'none';

    // Ajoute chaque champ
    Object.entries(data).forEach(([key, value]) =>
    {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = Array.isArray(value) ? value.join(', ') : String(value || '');
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit(); // envoi classique (pas de CORS)
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden text-center p-8">
          <h1 className="text-3xl font-bold text-emerald-600 mb-4">Merci pour votre participation !</h1>
          <p className="text-slate-600">
            Vos réponses sont en cours d’enregistrement… vous allez être redirigé·e.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;