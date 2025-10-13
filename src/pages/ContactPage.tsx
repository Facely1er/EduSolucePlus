import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Bug, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';

export function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Merci pour votre message ! Nous vous répondrons dans les 24 heures.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const supportCategories = [
    { value: 'general', label: 'Demande Générale', icon: <MessageCircle className="h-4 w-4" /> },
    { value: 'technical', label: 'Support Technique', icon: <Bug className="h-4 w-4" /> },
    { value: 'training', label: 'Questions Formation', icon: <HelpCircle className="h-4 w-4" /> },
    { value: 'compliance', label: 'Conseils Conformité', icon: <HelpCircle className="h-4 w-4" /> }
  ];

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
        <p className="text-muted-foreground">
          Obtenez de l'aide pour la conformité, les problèmes techniques ou des questions générales sur EduSoluce.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    placeholder="Votre nom complet"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    placeholder="votre.email@ecole.ci"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                    placeholder="Votre école ou université"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-2">
                    Votre Rôle
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="">Sélectionnez votre rôle</option>
                    <option value="administrator">Direction Générale</option>
                    <option value="teacher">Corps Enseignant</option>
                    <option value="it-staff">Personnel IT / DSI</option>
                    <option value="student">Étudiant(e)</option>
                    <option value="parent">Parent</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Catégorie *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    {supportCategories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-2">
                    Priorité
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  placeholder="Brève description de votre demande"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm resize-none"
                  placeholder="Veuillez fournir des détails sur votre question ou problème..."
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Envoyer le Message
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Nous Contacter</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium">Support Email</p>
                  <p className="text-sm text-muted-foreground">support@ermits.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium">Support Téléphonique</p>
                  <p className="text-sm text-muted-foreground">+ 1 (240) 599-0102</p>
                  <p className="text-xs text-muted-foreground">Lun-Ven, 8h - 18h EST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium">Adresse Bureau</p>
                  <p className="text-sm text-muted-foreground">
                    Gaithersburg, MD 20877 
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Heures d'Assistance
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="text-muted-foreground">8h00 - 18h00 EST</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="text-muted-foreground">10h00 - 14h00 EST</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-muted-foreground">Fermé</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Pour les problèmes urgents en dehors des heures de bureau, veuillez marquer votre demande comme "Urgente" et nous vous répondrons dès que possible.
              </p>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-2">Réponses Rapides</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Consultez notre foire aux questions pour des réponses immédiates aux questions courantes.
            </p>
            <Link to="/faq">
              <Button variant="outline" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Voir la FAQ
              </Button>
            </Link>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Ressources en Libre-Service</h4>
              <div className="space-y-2">
                <Link to="/how-it-works" title="Découvrez comment fonctionne notre plateforme" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Comment Fonctionne EduSoluce
                  </Button>
                </Link>
                <Link to="/training" title="Accédez aux guides de formation" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Formation Autonome
                  </Button>
                </Link>
                <Link to="/resources" title="Téléchargez des ressources et modèles utiles" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Bibliothèque de Ressources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}