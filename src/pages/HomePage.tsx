import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { CallToActionSection } from '../components/home/CallToActionSection'; 
import { CheckCircle, Users, GraduationCap, Laptop, Smartphone, BookOpen, ArrowRight, FileCheck, Shield, RefreshCw, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Our Approach Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Solution Overview</h2>
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
            EduSoluce™ is a comprehensive privacy education platform designed specifically for educational institutions, combining assessment, training, and compliance tools into one intuitive solution.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4 pl-8">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <FileCheck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Self-Service Privacy Portal</h3>
                  <p className="text-muted-foreground text-sm">Comprehensive privacy management including data rights, compliance obligations, and stakeholder access.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Role-Based Approach</h3>
                  <p className="text-muted-foreground text-sm">Customized experiences for administrators, teachers, IT staff, and students with relevant content for each.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <RefreshCw className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">North American Compliance</h3>
                  <p className="text-muted-foreground text-sm">Support for FERPA, COPPA, CCPA, BIPA, PIPEDA, and other regional privacy regulations.</p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/how-it-works">
                  <Button variant="outline">
                    Discover how EduSoluce™ works
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/30 p-8 rounded-full w-80 h-80 flex items-center justify-center relative">
                {/* Outer glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-xl"></div>
                
                {/* Main circle */}
                <div className="w-56 h-56 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center relative z-10">
                  {/* Central shield */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-28 w-28 text-primary-600/90 dark:text-primary-400" />
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute top-6 right-5 bg-green-100 dark:bg-green-900/40 p-3 rounded-full shadow-md">
                    <GraduationCap className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <div className="absolute bottom-10 right-6 bg-amber-100 dark:bg-amber-900/40 p-3 rounded-full shadow-md">
                    <FileCheck className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  
                  <div className="absolute bottom-6 left-10 bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full shadow-md">
                    <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div className="absolute top-10 left-6 bg-purple-100 dark:bg-purple-900/40 p-3 rounded-full shadow-md">
                    <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  
                  {/* Center checkmark to indicate achievement/compliance */}
                  <div className="absolute bg-white dark:bg-gray-800 rounded-full p-2 z-20">
                    <div className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-full">
                      <CheckCircle className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* Benefits for Every Stakeholder */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Benefits for Every Stakeholder</h2>
          <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3">
                    <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-xl">Administrators</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Ensure institutional compliance with ease</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Gain insights into overall privacy posture</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Streamline policy management and reporting</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link to="/role/administrator" title="Access the Administrator Hub">
                    <Button variant="outline" size="sm">
                      Explore Administrator Hub
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3">
                    <GraduationCap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-xl">Teachers</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Understand classroom privacy best practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Evaluate EdTech tools for compliance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Protect student data in daily activities</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link to="/role/teacher" title="Access the Teacher Hub">
                    <Button variant="outline" size="sm">
                      Explore Teacher Hub
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3">
                    <Laptop className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-xl">IT Staff</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Enhance system security and data protection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Manage vendor compliance and risk</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Respond effectively to security incidents</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link to="/role/it-staff" title="Access the IT Staff Hub">
                    <Button variant="outline" size="sm">
                      Explore IT Staff Hub
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3">
                    <Smartphone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-xl">Students</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Learn about digital privacy rights and safety</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Develop responsible online habits</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Understand their digital footprint</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link to="/role/student" title="Access the Student Hub">
                    <Button variant="outline" size="sm">
                      Explore Student Hub
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </section>

      <CallToActionSection />
    </>
  );
}