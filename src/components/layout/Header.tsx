import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, Puzzle, HelpCircle, ChevronDown, User, Menu, Shield, Users, Laptop, Book, Search, X, LogOut, Settings, UserCircle, Home, FileText, CheckCircle, AlertTriangle, Building } from 'lucide-react';
import { Zap } from 'lucide-react';
import { BarChart3 } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Database } from 'lucide-react';

import { NotificationDropdown } from '../notifications/NotificationDropdown';
import { useUser } from '../../hooks/useSupabase';

function RoleHubDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);

  const roleLinks = [
    { icon: Shield, label: 'Direction Générale', href: '/role/administrator' },
    { icon: Users, label: 'Corps Enseignant', href: '/role/teacher' },
    { icon: Laptop, label: 'Personnel IT / DSI', href: '/role/it-staff' },
    { icon: Book, label: 'Étudiants', href: '/role/student' }
  ];

  return (
    <div 
      className="relative px-0"
      onBlur={(e) => {
        // Close dropdown when clicking outside
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-1.5 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
          Rôles & Tableaux de Bord
        </span>
        <ChevronDown className={`relative top-[1px] ml-1 h-3 w-3 transition duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-md shadow-lg z-50">
          <div className="py-1">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4 mr-3" />
              Sélecteur de Tableau de Bord
            </Link>
            <div className="border-t border-border my-1"></div>
            {roleLinks.map((role) => (
              <Link
                key={role.label}
                to={role.href}
                className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                <role.icon className="h-4 w-4 mr-3" />
                {role.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResourcesDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);

  const resourceTypes = [
   /* { label: 'All Resources', href: '/resources', icon: BookOpen },*/
    { label: 'Réglementations', href: '/resources/privacy-regulations', icon: Shield },
    { label: 'Guides Professionnels', href: '/resources/professional-guides', icon: GraduationCap },
    { label: 'Outils & Modèles', href: '/resources/tools-templates', icon: Puzzle }
  ];

  return (
    <div 
      className="relative px-0"
      onBlur={(e) => {
        // Close dropdown when clicking outside
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-1.5 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <BookOpen className="h-3.5 w-3.5 mr-1" />
          Ressources
        </span>
        <ChevronDown className={`relative top-[1px] ml-1 h-3 w-3 transition duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-50">
          <div className="py-1">
            {resourceTypes.map((resource) => (
              <Link
                key={resource.label}
                to={resource.href}
                className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                <resource.icon className="h-4 w-4 mr-3" />
                {resource.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PrivacyPortalDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);

  const portalLinks = [
    { icon: LayoutDashboard, label: 'Tableau de Bord', href: '/privacy/dashboard' },
    { icon: FileText, label: 'Droits des Personnes', href: '/privacy/data-rights' },
    { icon: CheckCircle, label: 'Obligations de Conformité', href: '/privacy/obligations' },
    { icon: AlertTriangle, label: 'Incidents de Sécurité', href: '/privacy/incidents' },
    { icon: Building, label: 'Évaluation Fournisseurs', href: '/privacy/vendors' },
    { icon: Users, label: 'Gestion du Consentement', href: '/privacy/consent' },
    { icon: Users, label: 'Gestion des Parties Prenantes', href: '/privacy/stakeholders' },
    { icon: Zap, label: 'Automatisation', href: '/privacy/automation' },
    { icon: BarChart3, label: 'Analyses & Rapports', href: '/privacy/analytics' }
  ];

  return (
    <div 
      className="relative px-0"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-1.5 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <Database className="h-3.5 w-3.5 mr-1" />
          Portail Vie Privée
        </span>
        <ChevronDown className={`relative top-[1px] ml-1 h-3 w-3 transition duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-md shadow-lg z-50">
          <div className="py-1">
            {portalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="h-4 w-4 mr-3" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut } = useUser();
  const navigate = useNavigate();
  
  // Handle clicks outside the user menu dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    // Only add the event listener when the menu is open
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [userMenuOpen]);
  
  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };
  
  // Format user display name
  const userDisplayName = profile?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="container flex h-16 items-center justify-between px-2">
        <Link className="flex items-center gap-1.5" to="/">
          <img src="/logos/edusoluce-logo.png" alt="Logo EduSoluce" className="h-8 w-8" />
          <div className="flex flex-col">
            <span className="font-bold text-xs md:text-sm lg:text-base leading-none">EduSoluce</span>
            <span className="text-[10px] text-muted-foreground">par ERMITS</span>
          </div>
        </Link>

        <nav className="relative z-10 flex-1 items-center justify-center hidden md:flex mx-1">
          <div className="relative">
            <ul className="group flex list-none items-center space-x-0 -mx-1">
              <li>
                <Link className="group h-9 w-max justify-center rounded-md bg-background px-1.5 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center" to="/">
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link className="group h-9 w-max justify-center rounded-md bg-background px-1.5 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center" to="/how-it-works" title="Découvrez comment fonctionne EduSoluce™">
                  <HelpCircle className="h-3.5 w-3.5 mr-1" />
                  Comment ça marche
                </Link>
              </li>
              <li>
                <RoleHubDropdown />
              </li>
              <li>
                <ResourcesDropdown />
              </li>
              <li>
                <PrivacyPortalDropdown />
              </li>
              <li>
                <Link className="group h-9 w-max justify-center rounded-md bg-background px-1.5 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center" to="/integration" title="Explorez l'écosystème ERMITS">
                  <Puzzle className="h-3.5 w-3.5 mr-1" />
                  Intégration
                </Link>
              </li>
              <li>
                <Link className="group h-9 w-max justify-center rounded-md bg-background px-1.5 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center" to="/contact" title="Contactez notre équipe de support">
                  <HelpCircle className="h-3.5 w-3.5 mr-1" />
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex items-center space-x-2">
          {/* Search and Notifications - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <NotificationDropdown />
          </div>
          
          <ThemeToggle />
          {user ? (
            <div className="hidden md:block relative">
              <button
                className="flex items-center gap-2 rounded-full border p-1 pl-3 pr-2 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <span className="text-sm font-medium">{userDisplayName}</span>
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile?.full_name || 'Avatar'}
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userDisplayName)}&background=random`;
                    }}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <UserCircle className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                  </div>
                )}
              </button>
              
              {userMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg border shadow-lg z-50">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium">{userDisplayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {profile?.role && (
                      <span className="inline-block mt-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-xs rounded-full">
                        {profile.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    )}
                  </div>
                  <div className="p-1">
                    <Link 
                      to="/profile" 
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Mon Profil
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </Link>
                  </div>
                  <div className="p-1 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">
                  <User className="mr-1 h-3.5 w-3.5" />
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button>
                  S'inscrire
                </Button>
              </Link>
            </div>
          )}
          <Button 
            className="flex md:hidden" 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-black" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full bg-white dark:bg-gray-900 border-l shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <span className="font-bold text-xl">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="px-4 py-2 space-y-0 bg-white dark:bg-gray-900">
              {/* Search and Notifications - Mobile */}
              <div className="flex gap-2 mb-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Search className="mr-2 h-4 w-4" />
                  Rechercher
                </Button>
                <div className="flex">
                  <NotificationDropdown mobile />
                </div>
              </div>
              
              {user ? (
                <>
                  <div className="border-b border-gray-200 dark:border-gray-700 py-2 px-4">
                    <div className="flex items-center gap-3">
                      {profile?.avatar_url ? (
                        <img 
                          src={profile.avatar_url} 
                          alt={profile?.full_name || 'Avatar'}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userDisplayName)}&background=random`;
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <UserCircle className="h-7 w-7 text-primary-600 dark:text-primary-300" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{userDisplayName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <Link to="/profile" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <UserCircle className="mr-2 h-4 w-4" />
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/settings" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </>
              ) : null}

              <Link to="/" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start py-1.5">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>

              <Link to="/dashboard" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start py-1.5">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard Selector
                </Button>
              </Link>
              <div className="space-y-0 pt-0.5 pl-8">
                {[
                  { label: 'Administrator Hub', icon: Shield, path: '/role/administrator' },
                  { label: 'Teacher Hub', icon: Users, path: '/role/teacher' },
                  { label: 'IT Staff Hub', icon: Laptop, path: '/role/it-staff' },
                  { label: 'Student Hub', icon: Book, path: '/role/student' }
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="flex items-center py-0.5 px-3 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link to="/resources" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start py-1.5">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Resources
                </Button>
              </Link>
              <Link to="/resources/professional-guides" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Professional Guides
                </Button>
              </Link>
              <Link to="/integration" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start py-1.5">
                  <Puzzle className="mr-2 h-4 w-4" />
                  Integration
                </Button>
              </Link>
              <Link to="/privacy-policy" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start py-1.5">
                  <Database className="mr-2 h-4 w-4" />
                  Privacy Portal
                </Button>
              </Link>
              <Link to="/contact" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start py-1.5">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Support
                </Button>
              </Link>
              
              <div className="pt-2 border-t">
                {user ? (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full py-1.5">
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full py-1.5">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/how-it-works" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start py-1.5">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  How it Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl mx-4">
            <div className="flex items-center border-b p-4">
              <Search className="h-5 w-5 mr-3 text-muted-foreground" />
              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none"
                placeholder="Search for guides, assessments, or resources..."
                autoFocus
              />
              <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Enter keywords to search across EduSoluce™</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}