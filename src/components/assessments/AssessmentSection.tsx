import { Link } from 'react-router-dom';
import { Shield, Users, Laptop, Book } from 'lucide-react';
import { AssessmentCard } from './AssessmentCard';
import { Button } from '../ui/Button';

export function AssessmentSection() {
  const assessments = [
    {
      icon: Shield,
      title: 'Évaluations Direction',
      description: 'Pour directeurs, présidents et personnel administratif',
      numAssessments: 5,
      link: '/assessments/administrator'
    },
    {
      icon: Users,
      title: 'Évaluations Enseignants',
      description: 'Pour enseignants et personnel pédagogique',
      numAssessments: 4,
      link: '/assessments/teacher'
    },
    {
      icon: Laptop,
      title: 'Évaluations Personnel IT',
      description: 'Pour coordinateurs technologiques et personnel de support',
      numAssessments: 6,
      link: '/assessments/it-staff'
    },
    {
      icon: Book,
      title: 'Évaluations Étudiants',
      description: 'Pour que les étudiants apprennent sur la confidentialité numérique',
      numAssessments: 3,
      link: '/assessments/student'
    }
  ];

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Évaluations de Conformité
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Évaluations spécifiques par rôle conçues pour évaluer la conformité de votre institution avec 
            les réglementations sur la protection des données éducatives, incluant le RGPD, la Loi Ivoirienne, et plus.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {assessments.map((assessment, index) => (
            <AssessmentCard
              key={index}
              icon={assessment.icon}
              title={assessment.title}
              description={assessment.description}
              numAssessments={assessment.numAssessments}
              link={assessment.link}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Besoin d'aide pour choisir la bonne évaluation ? Découvrez notre approche complète.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/how-it-works" title="Découvrez comment fonctionnent nos évaluations">
              <Button variant="outline">
                Comment fonctionnent les évaluations
              </Button>
            </Link>
            <Link to="/resources/professional-guides" title="Accédez aux guides pour améliorer vos scores">
              <Button variant="outline">
                Guides de développement professionnel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}