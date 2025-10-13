import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, GraduationCap, LineChart, Database, Users } from 'lucide-react';


export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Évaluations de Conformité',
      description: 'Évaluations spécifiques par rôle pour évaluer la conformité de votre institution au RGPD, loi ivoirienne et autres réglementations.',
      link: '/assessment'
    },
    {
      icon: BookOpen,
      title: 'Bibliothèque de Ressources',
      description: 'Accédez aux modèles téléchargeables, listes de contrôle et guides pour mettre en œuvre les meilleures pratiques.',
      link: '/resources'
    },
    {
      icon: GraduationCap,
      title: 'Guides Professionnels',
      description: 'Contenu de formation interactif pour le développement du personnel sur la protection des données.',
      link: '/training'
    },
    {
      icon: LineChart,
      title: 'Tableau de Bord de Conformité',
      description: 'Suivez vos progrès et identifiez les domaines d\'amélioration avec des analyses visuelles.',
      link: '/dashboard'
    },
    {
      icon: Database,
      title: 'Portail Libre-Service Vie Privée',
      description: 'Gérez les demandes de droits, registres de consentement et obligations de conformité en un seul endroit.',
      link: '/privacy'
    },
    {
      icon: Users,
      title: 'Gestion des Parties Prenantes',
      description: 'Fournissez un accès approprié aux étudiants, parents et personnel pour leurs droits numériques.',
      link: '/privacy/stakeholders'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Simplifiez la Conformité Éducative
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.link}
              className="group"
              title={`En savoir plus sur ${feature.title}`}
            >
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md group-hover:border-primary-300">
                <div className="flex flex-col space-y-1.5 p-6 pb-2">
                  <div className="mb-4">
                    <feature.icon className="h-10 w-10 text-primary-600 group-hover:text-primary-700 transition-colors" />
                  </div>
                  <h3 className="font-semibold tracking-tight text-xl group-hover:text-primary-700 transition-colors">{feature.title}</h3>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-muted-foreground text-base">{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}