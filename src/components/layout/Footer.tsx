import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Shield, HelpCircle, Mail, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLocalUser } from '../../hooks/useLocalUser';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);
  const { localUser, saveNewsletterSubscription } = useLocalUser();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear any previous messages when user starts typing again
    setSubscriptionSuccess(false);
    setSubscriptionError(null);
  };

  const handleSubscribe = () => {
    // Reset states
    setSubscriptionSuccess(false);
    setSubscriptionError(null);
    
    // Basic validation
    if (!email) {
      setSubscriptionError('Please enter your email address');
      return;
    }
    
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionError('Please enter a valid email address');
      return;
    }
    
    // Simulate subscription process
    setIsSubscribing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubscribing(false);

      try {
        // Save to local storage
        saveNewsletterSubscription(email);
        
        // Simulate successful subscription
        setSubscriptionSuccess(true);
        setEmail(''); // Clear the input field on success
        
        // Store subscription in localStorage
        const subscribedEmails = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
        subscribedEmails.push({
          email,
          timestamp: new Date().toISOString(),
          userId: localUser?.id || 'anonymous'
        });
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscribedEmails));
      } catch (error) {
        console.error('Error saving subscription:', error);
        setSubscriptionError('Failed to save your subscription. Please try again.');
      }
    }, 1500);
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logos/edusoluce-logo.png" 
                alt="Logo EduSoluce" 
                className="h-[2.7rem] w-[2.7rem]"
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none">EduSoluce™</span>
                <span className="text-xs text-muted-foreground">par ERMITS</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Accompagner les institutions éducatives africaines dans la protection des données 
              personnelles et la conformité réglementaire avec confiance.
            </p>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                © 2025 ERMITS LLC. Tous droits réservés.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-sm mb-4">Liens Rapides</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Tableaux de Bord
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Portail Vie Privée
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Ressources
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="font-medium text-sm mb-4">Mentions Légales & Ressources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/legal" className="text-muted-foreground hover:text-foreground flex items-center gap-2" title="Consulter les mentions légales">
                  <GavelIcon className="h-4 w-4" />
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground flex items-center gap-2" title="Lire nos conditions d'utilisation">
                  <FileText className="h-4 w-4" />
                  Conditions d'Utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground flex items-center gap-2" title="Lire notre politique de confidentialité">
                  <Shield className="h-4 w-4" />
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground flex items-center gap-2" title="Contacter notre équipe de support">
                  <Mail className="h-4 w-4" />
                  Contacter le Support
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-sm mb-4">S'abonner aux Mises à Jour</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Restez informé des nouvelles réglementations et ressources de conformité.
            </p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="Votre adresse email" 
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubscribing}
                />
                <Button onClick={handleSubscribe} disabled={isSubscribing}>
                  {isSubscribing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      S'abonner
                    </>
                  )}
                </Button>
              </div>
              
              {/* Success message */}
              {subscriptionSuccess && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>Merci ! Vous êtes maintenant abonné à nos mises à jour.</span>
                </div>
              )}
              
              {/* Error message */}
              {subscriptionError && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{subscriptionError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Add GavelIcon since it's not in lucide-react
function GavelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m14 14-8.5-8.5a2.12 2.12 0 1 0-3 3L11 17a2.12 2.12 0 1 0 3-3" />
      <path d="M17 17h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h3" />
      <path d="m14 14 3.5-3.5a2.12 2.12 0 1 0-3-3L11 11" />
    </svg>
  );
}