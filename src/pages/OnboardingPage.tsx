import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Users, 
  Laptop, 
  Book,
  Lightbulb,
  GraduationCap,
  FileText,
  Target,
  Database
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { RoleSelectionWizard } from '../components/onboarding/RoleSelectionWizard';
import { useUser } from '../hooks/useSupabase';

export function OnboardingPage() {
  const { user, profile } = useUser();
  const [showGetStarted, setShowGetStarted] = useState(false);
  
  return (
    <div>
      <Breadcrumb />
      
      {/* Welcome Section */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bienvenue sur EduSoluce™ Afrique</h1>
            <p className="text-blue-100 text-lg mb-6">
              Votre parcours vers une conformité simplifiée en matière de protection des données éducatives commence ici. EduSoluce™ Afrique aide les institutions éducatives à naviguer dans les réglementations complexes avec confiance.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {user ? (
                <Link to={profile ? `/role/${profile.role}` : '/dashboard'} title={profile ? `Accédez à votre hub ${profile.role.replace('-', ' ')}` : 'Choisissez votre tableau de bord spécifique au rôle'}>
                  <Button className="bg-white text-primary-700 hover:bg-gray-100" title="Commencez votre parcours de conformité">
                    {profile ? `Aller au Hub ${profile.role.replace('-', ' ')}` : 'Aller au Tableau de Bord'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Button 
                    onClick={() => setShowGetStarted(true)}
                    className="bg-white text-primary-700 hover:bg-gray-100"
                  >
                    Commencer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link to="/login" title="Connectez-vous à votre compte existant">
                    <Button variant="outline" className="border-white/30 hover:bg-white/20">
                      Se Connecter
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showGetStarted ? (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Sélectionnez Votre Rôle pour Commencer</h2>
          <RoleSelectionWizard />
        </div>
      ) : (
        <>
          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Comment Fonctionne EduSoluce™ Afrique</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">1. Évaluer</h3>
                <p className="text-muted-foreground text-sm">
                  Complétez des évaluations spécifiques par rôle pour identifier les lacunes de conformité et établir votre compréhension de base.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">2. Apprendre</h3>
                <p className="text-muted-foreground text-sm">
                  Accédez à des modules de formation interactifs et des ressources adaptés à votre rôle et à vos lacunes de connaissances.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3. Mettre en Œuvre</h3>
                <p className="text-muted-foreground text-sm">
                  Appliquez vos connaissances avec des outils pratiques, des modèles et des plans d'action pour améliorer la conformité de votre institution.
                </p>
              </div>
            </div>
          </div>

          {/* Role-Based Experience */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Choisissez Votre Expérience par Rôle</h2>
              <Button onClick={() => setShowGetStarted(true)} variant="outline">
                Lancer l'Assistant Rôle <Lightbulb className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/role/administrator" className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Direction Générale</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Pour directeurs, présidents et responsables institutionnels chargés de la conformité de l'institution.
                  </p>
                  <Button variant="outline" size="sm">
                    Voir le Hub Direction <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
              
              <Link to="/role/teacher" className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Corps Enseignant</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Pour les enseignants qui gèrent les informations des étudiants et les technologies éducatives.
                  </p>
                  <Button variant="outline" size="sm">
                    Voir le Hub Enseignant <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
              
              <Link to="/role/it-staff" className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <Laptop className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Personnel IT / DSI</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Pour les coordinateurs technologiques et le personnel qui gèrent les systèmes et la sécurité des données.
                  </p>
                  <Button variant="outline" size="sm">
                    Voir le Hub IT <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
              
              <Link to="/role/student" className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <Book className="h-12 w-12 text-amber-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Étudiant(e)</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Pour que les étudiants découvrent leurs droits à la vie privée et les pratiques de sécurité numérique.
                  </p>
                  <Button variant="outline" size="sm">
                    Voir le Hub Étudiant <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Key Benefits */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Avantages Clés</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Conformité Simplifiée</h3>
                      <p className="text-sm text-muted-foreground">Transformez les réglementations complexes en étapes actionnables adaptées à votre rôle.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Réduction des Risques</h3>
                      <p className="text-sm text-muted-foreground">Identifiez et traitez les vulnérabilités avant qu'elles ne conduisent à des incidents coûteux.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Développement du Personnel</h3>
                      <p className="text-sm text-muted-foreground">Améliorez les connaissances et compétences de votre équipe avec une formation ciblée.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Efficacité des Ressources</h3>
                      <p className="text-sm text-muted-foreground">Gagnez du temps avec des modèles, listes de contrôle et guides prêts à l'emploi.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Renforcement de la Confiance</h3>
                      <p className="text-sm text-muted-foreground">Développez la confiance dans vos pratiques avec des évaluations complètes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Amélioration Continue</h3>
                      <p className="text-sm text-muted-foreground">Suivez les progrès et adaptez-vous aux exigences évolutives avec un support continu.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Get Started CTA */}
          <div className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg border p-8">
            <h2 className="text-2xl font-bold mb-4">Prêt à Commencer ?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Sélectionnez votre rôle pour accéder à un tableau de bord personnalisé avec des évaluations, modules de formation et ressources pertinents pour vos besoins spécifiques.
            </p>
            <Button onClick={() => setShowGetStarted(true)} size="lg" title="Commencez le processus de sélection de rôle">
              Choisissez Votre Rôle <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Vous savez déjà ce dont vous avez besoin ?
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/assessment" title="Accédez directement aux évaluations">
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    Faire une Évaluation
                  </Button>
                </Link>
                <Link to="/training" title="Parcourez les guides de développement professionnel">
                  <Button variant="outline" size="sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Parcourir Formations
                  </Button>
                </Link>
                <Link to="/privacy-policy" title="Accédez au portail de confidentialité">
                  <Button variant="outline" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    Portail Confidentialité
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}