import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { AdministratorDashboard } from './dashboards/AdministratorDashboard';
import { AdministratorAssessmentPage } from './AdministratorAssessmentPage';
import { RoleTrainingContent } from '../components/training/RoleTrainingContent';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { LayoutDashboard, FileCheck, ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';
import { RoleDetailCard } from '../components/onboarding/RoleDetailCard';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../common/LoadingState';
import { useUser } from '../hooks/useSupabase';

export function AdministratorRolePage() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    tabParam === 'assessments' ? 'assessments' : 
    tabParam === 'training' ? 'training' : 
    'dashboard'
  );
  const { user, profile, loading: userLoading } = useUser();


  // Debug logging (development only)
  if (import.meta.env.DEV) {
    console.log('AdministratorRolePage - render', { 
      user: user ? 'exists' : 'null', 
      profile: profile ? 'exists' : 'null',
      userLoading,
      role: profile?.role
    });
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL query parameter without page refresh
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    window.history.pushState({}, '', url);
  };

  // Check if user has appropriate role
  const isAdministrator = profile?.role === 'administrator';

  // Show loading state while user data is loading (but not indefinitely)
  if (userLoading) {
    return (
      <div className="container py-8">
        <Breadcrumb />
        <LoadingState 
          loading={true} 
          loadingMessage="Chargement du profil utilisateur..." 
        />
      </div>
    );
  }

  // Show demo mode notice if no user is authenticated
  const DemoModeNotice = () => {
    if (user) return null;
    
    return (
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Mode Démonstration</h3>
        <p className="text-blue-700 dark:text-blue-300 mb-3">
          Vous consultez le Hub Direction Générale en mode démonstration. Certaines fonctionnalités peuvent être limitées sans authentification.
        </p>
        <div className="flex gap-2">
          <Link to="/login">
            <Button size="sm" variant="outline">
              Se Connecter
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">
              Créer un Compte
            </Button>
          </Link>
        </div>
      </div>
    );
  };


  // Role suggestion notice if user is not an administrator
  const RoleSuggestionNotice = () => {
    if (!user || isAdministrator) return null;
    
    return (
      <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-1">Consultation du Contenu Direction Générale</h3>
        <p className="text-amber-700 dark:text-amber-300 mb-3">
          Vous consultez le contenu pour la direction générale, mais votre compte est enregistré en tant que {profile?.role.replace('-', ' ')}. 
          Bien que vous puissiez explorer ce contenu, certaines fonctionnalités peuvent être limitées.
        </p>
        <Link to={`/role/${profile?.role}`}>
          <Button size="sm" variant="outline">
            Aller au hub {profile?.role.replace('-', ' ')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <DemoModeNotice />
      
      <div className="mb-8">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hub Direction Générale</h1>
            <p className="text-muted-foreground">
              Accès centralisé aux tableaux de bord, évaluations et ressources pour la direction générale
            </p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la Sélection de Rôle
            </Button>
          </Link>
        </div>
      </div>

      <RoleSuggestionNotice />

      {/* Role Description Card */}
      <div className="mb-8">
        <RoleDetailCard roleType="administrator" />
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Tableau de Bord
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Évaluations
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Plan d'Action & Formation
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Hub Direction Générale :</strong> Utilisez les onglets ci-dessus pour naviguer entre votre tableau de bord de conformité, les évaluations et la formation. Le tableau de bord fournit une vue complète du statut de conformité en matière de protection des données de votre institution, les évaluations vous aident à évaluer des domaines spécifiques, et le plan d'action guide vos améliorations continues en matière de protection des données.
          </p>
        </div>
        
        <TabsContent value="dashboard" className="mt-0">
          <AdministratorDashboard />
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-0">
          <AdministratorAssessmentPage />
        </TabsContent>
        
        <TabsContent value="training" className="mt-0">
          <RoleTrainingContent roleType="administrator" />
        </TabsContent>
      </Tabs>
    </div>
  );
}