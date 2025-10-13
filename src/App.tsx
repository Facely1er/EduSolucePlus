import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider, SkipToContent } from './components/common/AccessibilityProvider';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/layout/Header'; 
import { Footer } from './components/layout/Footer';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { LoadingState } from './common/LoadingState';
import { RequireAuth } from './components/auth/RequireAuth';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AssessmentPage = React.lazy(() => import('./pages/AssessmentPage').then(m => ({ default: m.AssessmentPage })));
const AdministratorAssessmentPage = React.lazy(() => import('./pages/AdministratorAssessmentPage').then(m => ({ default: m.AdministratorAssessmentPage })));
const TeacherAssessmentPage = React.lazy(() => import('./pages/TeacherAssessmentPage').then(m => ({ default: m.TeacherAssessmentPage })));
const ITStaffAssessmentPage = React.lazy(() => import('./pages/ITStaffAssessmentPage').then(m => ({ default: m.ITStaffAssessmentPage })));
const StudentAssessmentPage = React.lazy(() => import('./pages/StudentAssessmentPage').then(m => ({ default: m.StudentAssessmentPage })));
const AssessmentQuestionnairePage = React.lazy(() => import('./pages/AssessmentQuestionnairePage').then(m => ({ default: m.AssessmentQuestionnairePage })));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const IntegrationPage = React.lazy(() => import('./pages/IntegrationPage').then(m => ({ default: m.IntegrationPage })));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const TrainingPage = React.lazy(() => import('./pages/TrainingPage').then(m => ({ default: m.TrainingPage })));
const TrainingModuleDetailPage = React.lazy(() => import('./pages/TrainingModuleDetailPage').then(m => ({ default: m.TrainingModuleDetailPage })));
const PrivacyRegulationsPage = React.lazy(() => import('./pages/resources/PrivacyRegulationsPage').then(m => ({ default: m.PrivacyRegulationsPage })));
const ProfessionalGuidesPage = React.lazy(() => import('./pages/resources/ProfessionalGuidesPage').then(m => ({ default: m.ProfessionalGuidesPage })));
const ToolsTemplatesPage = React.lazy(() => import('./pages/resources/ToolsTemplatesPage').then(m => ({ default: m.ToolsTemplatesPage })));
const HowItWorksPage = React.lazy(() => import('./pages/HowItWorks').then(m => ({ default: m.HowItWorksPage })));
const LearningPathsPage = React.lazy(() => import('./pages/LearningPathsPage').then(m => ({ default: m.LearningPathsPage })));
const LearningPathDetailPage = React.lazy(() => import('./pages/LearningPathDetailPage').then(m => ({ default: m.LearningPathDetailPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const CertificatePage = React.lazy(() => import('./pages/CertificatePage').then(m => ({ default: m.CertificatePage })));
const LoginPage = React.lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const TermsPage = React.lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const AdministratorRolePage = React.lazy(() => import('./pages/AdministratorRolePage').then(m => ({ default: m.AdministratorRolePage })));
const TeacherRolePage = React.lazy(() => import('./pages/TeacherRolePage').then(m => ({ default: m.TeacherRolePage })));
const ITStaffRolePage = React.lazy(() => import('./pages/ITStaffRolePage').then(m => ({ default: m.ITStaffRolePage })));
const StudentRolePage = React.lazy(() => import('./pages/StudentRolePage').then(m => ({ default: m.StudentRolePage })));
const PrivacyDashboardPage = React.lazy(() => import('./pages/privacy/PrivacyDashboardPage').then(m => ({ default: m.PrivacyDashboardPage })));
const DataRightsPortalPage = React.lazy(() => import('./pages/privacy/DataRightsPortalPage').then(m => ({ default: m.DataRightsPortalPage })));
const ComplianceObligationsPage = React.lazy(() => import('./pages/privacy/ComplianceObligationsPage').then(m => ({ default: m.ComplianceObligationsPage })));
const PrivacyIncidentsPage = React.lazy(() => import('./pages/privacy/PrivacyIncidentsPage').then(m => ({ default: m.PrivacyIncidentsPage })));
const VendorAssessmentsPage = React.lazy(() => import('./pages/privacy/VendorAssessmentsPage').then(m => ({ default: m.VendorAssessmentsPage })));
const ConsentManagementPage = React.lazy(() => import('./pages/privacy/ConsentManagementPage').then(m => ({ default: m.ConsentManagementPage })));
const StakeholderManagementPage = React.lazy(() => import('./pages/privacy/StakeholderManagementPage').then(m => ({ default: m.StakeholderManagementPage })));
const AutomationPage = React.lazy(() => import('./pages/privacy/AutomationPage').then(m => ({ default: m.AutomationPage })));
const AnalyticsPage = React.lazy(() => import('./pages/privacy/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const ReportsPage = React.lazy(() => import('./pages/privacy/ReportsPage').then(m => ({ default: m.ReportsPage })));
const OnboardingPage = React.lazy(() => import('./pages/OnboardingPage').then(m => ({ default: m.OnboardingPage })));
const CalendarPage = React.lazy(() => import('./pages/CalendarPage').then(m => ({ default: m.CalendarPage })));
const LegalPage = React.lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));
const FAQPage = React.lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ERMITSIntegrationHub = React.lazy(() => import('./pages/ERMITSIntegrationHub').then(m => ({ default: m.default })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
import { NotificationProvider } from './contexts/NotificationContext';
import { Analytics } from '@vercel/analytics/react';
import { OfflineStatusIndicator } from './components/common/OfflineStatusIndicator';
import { InteractiveTrainingWrapper } from './components/training/InteractiveTrainingWrapper';
import { environment } from './config/environment';

// Main app content
const AppContent = () => {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <ThemeProvider>
          <NotificationProvider>
            <div className="flex min-h-screen flex-col">
              <SkipToContent />
              <Header />
              <main 
                id="main-content" 
                className="flex-1 bg-background relative"
                tabIndex={-1}
              >
                <OfflineStatusIndicator />
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <LoadingState loading={true} loadingMessage="Loading page..." />
                  </div>
                }>
                  <Routes>
                  <Route path="/" element={
                    <HomePage />
                  } />
                  {/* Public Routes */}
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/legal" element={<LegalPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  {/* Training and Assessment Routes - accessible to all */}
                  <Route path="/assessment" element={<AssessmentPage />} />
                  <Route path="/assessments/administrator" element={<AdministratorAssessmentPage />} />
                  <Route path="/assessments/teacher" element={<TeacherAssessmentPage />} />
                  <Route path="/assessments/it-staff" element={<ITStaffAssessmentPage />} />
                  <Route path="/assessments/student" element={<StudentAssessmentPage />} />
                  <Route path="/assessment/:role/:assessmentId" element={<AssessmentQuestionnairePage />} />
                  <Route path="/training" element={<TrainingPage />} />
                  <Route path="/training/:moduleId" element={<TrainingModuleDetailPage />} />
                  <Route path="/training/:moduleId/interactive" element={<InteractiveTrainingWrapper />} />
                  <Route path="/resources/privacy-regulations" element={<PrivacyRegulationsPage />} />
                  <Route path="/resources/professional-guides" element={<ProfessionalGuidesPage />} />
                  <Route path="/resources/tools-templates" element={<ToolsTemplatesPage />} />
                  <Route path="/learning-paths" element={<LearningPathsPage />} />
                  <Route path="/learning-paths/:id" element={<LearningPathDetailPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/resources/:type" element={<ResourcesPage />} />
      
                  
                  {/* Dashboard, Role & Account Routes */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/dashboard/:role" element={<DashboardPage />} />
                  <Route path="/role/administrator" element={<AdministratorRolePage />} />
                  <Route path="/role/teacher" element={<TeacherRolePage />} />
                  <Route path="/role/it-staff" element={<ITStaffRolePage />} />
                  <Route path="/role/student" element={<StudentRolePage />} />
                  <Route path="/integration" element={<IntegrationPage />} />
                  <Route path="/ermits-hub" element={<ERMITSIntegrationHub />} />
                  <Route path="/calendar" element={
                    <RequireAuth>
                      <CalendarPage />
                    </RequireAuth>
                  } />
                  <Route path="/certificate" element={
                    <RequireAuth>
                      <CertificatePage />
                    </RequireAuth>
                  } />
                  <Route path="/profile" element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  } />
                  <Route path="/settings" element={
                    <RequireAuth>
                      <SettingsPage />
                    </RequireAuth>
                  } />
                  
                  {/* Privacy Self-Service Portal Routes */}
                  <Route path="/privacy-policy" element={<PrivacyDashboardPage />} />
                  <Route path="/privacy/dashboard" element={<PrivacyDashboardPage />} />
                  <Route path="/privacy/data-rights" element={<DataRightsPortalPage />} />
                  <Route path="/privacy/obligations" element={<ComplianceObligationsPage />} />
                  <Route path="/privacy/incidents" element={<PrivacyIncidentsPage />} />
                  <Route path="/privacy/vendors" element={<VendorAssessmentsPage />} />
                  <Route path="/privacy/consent" element={<ConsentManagementPage />} />
                  <Route path="/privacy/stakeholders" element={<StakeholderManagementPage />} />
                  <Route path="/privacy/data-processing" element={<Navigate to="/privacy/dashboard" replace />} />
                  <Route path="/privacy/automation" element={<AutomationPage />} />
                  <Route path="/privacy/analytics" element={<AnalyticsPage />} />
                  <Route path="/privacy/reports" element={<ReportsPage />} />
                  
                    {/* Catch-all route - show 404 page */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
                {environment.features.enableAnalytics && <Analytics />}
              <Footer />
            </div>
          </NotificationProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
};

function App() {
  // Environment validation on app start
  React.useEffect(() => {
    if (environment.production) {
      console.log('EduSoluce™ Production Mode Active');
    }
  }, []);

  return <AppContent />;
}

export default App;