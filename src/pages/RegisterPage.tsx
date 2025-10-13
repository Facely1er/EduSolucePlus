import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Building, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle,
  Check
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useUser } from '../hooks/useSupabase';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    organization: '',
    role: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signUp } = useUser();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName || !formData.role) {
      return 'Veuillez remplir tous les champs obligatoires.';
    }
    
    if (formData.password.length < 6) {
      return 'Le mot de passe doit contenir au moins 6 caractères.';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Les mots de passe ne correspondent pas.';
    }
    
    if (!formData.agreeToTerms) {
      return 'Veuillez accepter les Conditions d\'Utilisation et la Politique de Confidentialité.';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous messages
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const userData = {
        full_name: formData.fullName.trim(),
        role: formData.role.trim() as 'administrator' | 'teacher' | 'it-staff' | 'student',
        organization: formData.organization.trim() || null
      };

      const { data, error } = await signUp(formData.email, formData.password, userData);
      
      if (error) {
        if (error.message.includes("duplicate")) {
          setError("Cette adresse email est déjà enregistrée. Veuillez vous connecter.");
        } else {
          setError(error.message || "Échec de l'inscription. Veuillez réessayer.");
        }
      } else if (data.user) {
        setSuccess('Compte créé avec succès ! Veuillez vérifier votre email pour la confirmation.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Une erreur inattendue s\'est produite lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '' };
    
    let strength = 0;
    const checks = [
      { regex: /.{6,}/, text: 'Au moins 6 caractères' },
      { regex: /[a-z]/, text: 'Lettre minuscule' },
      { regex: /[A-Z]/, text: 'Lettre majuscule' },
      { regex: /[0-9]/, text: 'Chiffre' },
      { regex: /[^A-Za-z0-9]/, text: 'Caractère spécial' }
    ];
    
    checks.forEach(check => {
      if (check.regex.test(password)) strength++;
    });
    
    const strengthText = strength < 2 ? 'Faible' : strength < 4 ? 'Moyen' : 'Fort';
    const strengthColor = strength < 2 ? 'text-red-600' : strength < 4 ? 'text-yellow-600' : 'text-green-600';
    
    return { strength, text: strengthText, color: strengthColor, checks };
  };

  const passwordAnalysis = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="container py-8">
        <Breadcrumb />
        
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <img 
                src="/logos/edusoluce-logo.png" 
                alt="EduSoluce Logo" 
                className="h-12 w-12"
              />
              <div className="text-left">
                <div className="font-bold text-2xl">EduSoluce™ Afrique</div>
                <div className="text-xs text-muted-foreground">par ERMITS</div>
              </div>
            </Link>
            
            <h1 className="text-3xl font-bold mb-2">Créez votre compte</h1>
            <p className="text-muted-foreground">
              Rejoignez des milliers d'éducateurs dans la conformité des données
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Nom Complet *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Entrez votre nom complet"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Adresse Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Entrez votre email"
                  />
                </div>
              </div>

              {/* Organization */}
              <div>
                <label htmlFor="organization" className="block text-sm font-medium mb-2">
                  Organisation
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Votre école ou organisation"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-2">
                  Rôle *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez votre rôle</option>
                  <option value="administrator">Direction Générale</option>
                  <option value="teacher">Corps Enseignant</option>
                  <option value="it-staff">Personnel IT / DSI</option>
                  <option value="student">Étudiant(e)</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Mot de Passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Créez un mot de passe fort"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordAnalysis.strength < 2 ? 'bg-red-500' : 
                            passwordAnalysis.strength < 4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordAnalysis.strength / 5) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${passwordAnalysis.color}`}>
                        {passwordAnalysis.text}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {passwordAnalysis.checks.map((check, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            check.regex.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <span className={check.regex.test(formData.password) ? 'text-green-600' : 'text-muted-foreground'}>
                            {check.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirmez le Mot de Passe *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Confirmez votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-600">Les mots de passe correspondent</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <span className="text-red-600">Les mots de passe ne correspondent pas</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    J'accepte les{' '}
                    <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                      Conditions d'Utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link to="/privacy-policy" className="text-primary hover:text-primary/80 underline">
                      Politique de Confidentialité
                    </Link>
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-md">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">{success}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !formData.agreeToTerms}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Création du compte...
                  </>
                ) : (
                  <>
                    Créer un compte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign in link */}
            <div className="mt-6 text-center border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Vous avez déjà un compte ?{' '}
                <Link 
                  to="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}