import React from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  BookOpen,
  BarChart2,
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Brain,
  Puzzle,
  FileCheck,
  LayoutDashboard,
  GraduationCap,
  Mail
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';


export function HowItWorksPage() {
  const features = [
    {
      icon: FileCheck,
      title: 'Évaluations de Conformité',
      description: 'Évaluations spécifiques par rôle pour évaluer la conformité de votre institution avec le RGPD, la Loi Ivoirienne, et autres. Identifiez les points forts et les axes d\'amélioration.',
      link: '/assessment'
    },
    {
      icon: BookOpen,
      title: 'Bibliothèque de Ressources',
      description: 'Accédez à une bibliothèque de modèles téléchargeables, listes de contrôle et guides pour mettre en œuvre les meilleures pratiques et naviguer dans les réglementations complexes.',
      link: '/resources'
    },
    {
      icon: GraduationCap,
      title: 'Modules de Formation',
      description: 'Participez à du contenu de formation interactif et des parcours d\'apprentissage pour le développement du personnel sur la protection des données et la citoyenneté numérique.',
      link: '/training'
    },
    {
      icon: LayoutDashboard,
      title: 'Tableau de Bord Conformité',
      description: 'Suivez la posture globale de conformité de votre institution, surveillez les progrès et identifiez les zones de risque clés avec des analyses visuelles et des outils de reporting.',
      link: '/dashboard'
    },
    {
      icon: Puzzle,
      title: 'Intégration Écosystème',
      description: 'Connectez-vous de manière transparente au ERMITS Resilience Operating System™ pour la veille sur les menaces avancées, la gestion des risques fournisseurs et le conseil stratégique.',
      link: '/integration'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Évaluation & Découverte',
      description: 'Commencez avec des évaluations spécifiques par rôle pour identifier les lacunes de conformité et établir une compréhension de base.',
      icon: Target,
      features: ['Évaluations RGPD, Loi Ivoirienne, ARTCI', 'Questionnaires par rôle', 'Analyse automatisée des écarts', 'Notation de conformité']
    },
    {
      step: 2,
      title: 'Apprentissage & Développement',
      description: 'Accédez à des modules de formation adaptés et des ressources pour développer les connaissances et mettre en œuvre les meilleures pratiques.',
      icon: Brain,
      features: ['Modules de formation interactifs', 'Modèles téléchargeables', 'Tutoriels vidéo', 'Programmes de certification']
    },
    {
      step: 3,
      title: 'Mise en Œuvre & Action',
      description: 'Appliquez les concepts appris avec des outils et ressources pratiques pour une mise en œuvre immédiate.',
      icon: Zap,
      features: ['Modèles de politiques', 'Listes de contrôle', 'Outils d\'évaluation fournisseurs', 'Plans de réponse aux incidents']
    },
    {
      step: 4,
      title: 'Surveillance & Amélioration',
      description: 'Suivez les progrès avec des tableaux de bord et analyses pour assurer la conformité continue et l\'amélioration permanente.',
      icon: BarChart2,
      features: ['Tableaux de bord temps réel', 'Suivi des progrès', 'Rapports de conformité', 'Analyses de performance']
    }
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb />

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Comment Fonctionne EduSoluce™ Afrique
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            EduSoluce™ Afrique simplifie la conformité en matière de protection des données éducatives, permettant aux institutions de protéger les données des étudiants et de construire une culture de résilience numérique.
          </p>
        </div>

        {/* Overview Section */}
      </div>
    
      {/* Full-width Overview Section - Light */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Notre Approche</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="mt-4">
                <Link to="/assessment" title="Commencez votre évaluation de conformité">
                  <Button variant="outline" size="sm">
                    Commencer l'évaluation
                  </Button>
                </Link>
              </div>
            <div className="flex flex-col items-center">
              <Lightbulb className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Évaluer & Identifier</h3>
              <p className="text-muted-foreground">
                Commencez avec des évaluations spécifiques par rôle pour identifier les lacunes de conformité et les zones nécessitant une attention.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Apprendre & Appliquer</h3>
              <div className="mt-4">
                <Link to="/training" title="Accédez aux guides de développement professionnel">
                  <Button variant="outline" size="sm">
                    Commencer la formation
                  </Button>
                </Link>
              </div>
              <p className="text-muted-foreground">
                Accédez à des modules de formation adaptés et une riche bibliothèque de ressources pour développer connaissances et compétences.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <BarChart2 className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Surveiller & Améliorer</h3>
              <p className="text-muted-foreground">
                Utilisez les tableaux de bord et rapports pour suivre les progrès, assurer la conformité continue et favoriser l'amélioration continue.
              </p>
              <div className="mt-4">
                <Link to="/resources" title="Accédez aux outils et modèles de mise en œuvre">
                  <Button variant="outline" size="sm">
                    Voir les ressources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Detailed Process Steps */}
      </div>
      
      {/* Step-by-Step Process - Full Width Section */}
      <section className="w-full bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Processus Étape par Étape</h2>
        <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2">
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full mr-4">
                        <step.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">Étape {step.step}</div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center">
                    <step.icon className="h-24 w-24 text-primary-400" />
                  </div>
                </div>
              </div>
            ))}
        </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Core Features Section */}
      </div>
    
      {/* Full-width Core Features Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Fonctionnalités Principales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg border p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <feature.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-center">{feature.description}</p>
                <Link to={feature.link} className="block" title={`En savoir plus sur ${feature.title}`}>
                  <Button variant="outline" className="w-full" aria-label={`Explorer ${feature.title}`}>
                    {feature.title === 'Évaluations de Conformité' ? 'Faire une évaluation' :
                     feature.title === 'Bibliothèque de Ressources' ? 'Parcourir ressources' :
                     feature.title === 'Modules de Formation' ? 'Commencer formation' :
                     feature.title === 'Tableau de Bord Conformité' ? 'Voir le tableau de bord' :
                     `Explorer ${feature.title}`
                    } <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    
   

      {/* Full-width CTA Section */}
      <section className="w-full bg-primary-600 dark:bg-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-6 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à Commencer ?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            Rejoignez les institutions éducatives qui utilisent EduSoluce™ Afrique pour simplifier la conformité, protéger les données des étudiants et construire une culture de résilience numérique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-medium bg-white/20 border-white/30 text-white hover:bg-white/30">
                Contactez-nous <Mail className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button size="lg" className="font-medium bg-white text-primary-600 hover:bg-gray-100">
                Commencer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        </section>
    </>
  );
}