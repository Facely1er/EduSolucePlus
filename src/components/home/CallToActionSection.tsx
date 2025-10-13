import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function CallToActionSection() {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Découvrez EduSoluce™ Afrique
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
     Prêt à voir EduSoluce™ en action ? Explorez notre plateforme interactive pour comprendre comment notre solution peut transformer l'approche de conformité de votre institution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/onboarding" title="Commencez votre parcours EduSoluce™">
            <Button size="lg" className="font-medium">
              Commencez votre parcours <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/assessment" title="Évaluez vos connaissances en conformité">
            <Button size="lg" variant="outline" className="font-medium">
              Faites une évaluation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}