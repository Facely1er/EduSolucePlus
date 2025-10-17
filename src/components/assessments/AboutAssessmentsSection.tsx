export function AboutAssessmentsSection() {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">À Propos de Nos Évaluations</h2>
        
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Nos évaluations spécifiques par rôle sont conçues pour <strong>mesurer vos connaissances</strong> sur les 
            principales réglementations de protection des données éducatives, incluant le RGPD, la Loi Ivoirienne, ARTCI, et plus.
          </p>
          
          <p>
            Chaque évaluation fournit des commentaires immédiats avec des explications et des ressources pour améliorer vos 
            connaissances et les pratiques institutionnelles.
          </p>
          
          <p>
            À l'achèvement, vous recevrez un rapport détaillé et un certificat de formation qui peuvent être partagés avec 
            votre administration ou inclus dans vos dossiers de développement professionnel.
          </p>

          {/* Legal Disclaimer */}
          <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded">
            <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Avertissement Important
            </h3>
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <strong>Ces évaluations sont des outils éducatifs uniquement.</strong> Elles ne constituent pas un audit de conformité légale, 
              ne garantissent pas la conformité de votre institution, et ne remplacent pas les conseils d'un avocat ou d'un Délégué 
              à la Protection des Données (DPO) qualifié. Pour toute décision de conformité, consultez un expert juridique 
              et votre autorité de contrôle locale (ARTCI en Côte d'Ivoire, CNIL en France, etc.).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}