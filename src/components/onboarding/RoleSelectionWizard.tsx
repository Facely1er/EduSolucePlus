import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Laptop, Book, ChevronRight, ChevronLeft, Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  features: string[];
}

const roles: Role[] = [
  {
    id: 'administrator',
    title: 'Administrator Hub',
    description: 'For principals, superintendents, and educational leadership responsible for institution-wide compliance and governance.',
    icon: Shield,
    path: '/role/administrator',
    features: [
      'Institution-wide compliance dashboard',
      'Staff training management and tracking',
      'Policy development and implementation tools',
      'Compliance calendar and deadline management',
      'Executive reporting and analytics'
    ]
  },
  {
    id: 'teacher',
    title: 'Teacher Hub',
    description: 'For classroom educators who handle student information and need to understand privacy best practices in educational settings.',
    icon: Users,
    path: '/role/teacher',
    features: [
      'Classroom privacy best practices',
      'EdTech evaluation tools for FERPA/COPPA compliance',
      'Parent communication templates',
      'Student data handling guidelines',
      'Lesson plans for teaching digital citizenship'
    ]
  },
  {
    id: 'it-staff',
    title: 'IT Staff Hub',
    description: 'For technology coordinators and IT personnel who manage systems, data security, and technical infrastructure.',
    icon: Laptop,
    path: '/role/it-staff',
    features: [
      'Security and data protection dashboard',
      'Technical implementation guides',
      'Vendor security assessment tools',
      'Data breach response procedures',
      'System configuration recommendations'
    ]
  },
  {
    id: 'student',
    title: 'Student Hub',
    description: 'For students learning about digital privacy, their rights, and how to protect their information online.',
    icon: Book,
    path: '/role/student',
    features: [
      'Interactive privacy education',
      'Digital footprint management',
      'Social media privacy tools',
      'Rights and responsibilities guides',
      'Privacy skill-building activities'
    ]
  }
];

interface RoleSelectionWizardProps {
  onRoleSelect?: (roleId: string) => void;
}

export function RoleSelectionWizard({ onRoleSelect }: RoleSelectionWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // The steps of the wizard
  const steps = [
    { title: 'Select Your Role Hub', description: 'Choose the role that best matches your position or needs' },
    { title: 'Explore Features', description: 'See what features are available for your selected role' },
    { title: 'Get Started', description: 'Begin your privacy compliance journey' }
  ];
  
  // When a role is selected in step 1
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setCurrentStep(1);
    if (onRoleSelect) onRoleSelect(roleId);
  };
  
  // Move to the next step
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the wizard
      const role = roles.find(r => r.id === selectedRole);
      if (role) {
        navigate(role.path);
      }
    }
  };
  
  // Move to the previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Skip the wizard and go directly to the role
  const handleSkipToRole = () => {
    const role = roles.find(r => r.id === selectedRole);
    if (role) {
      navigate(role.path);
    }
  };
  
  // Get the selected role object
  const getSelectedRole = (): Role | undefined => {
    return roles.find(role => role.id === selectedRole);
  };
  
  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <div className="flex justify-center mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              index < currentStep ? 'bg-green-500 text-white' : 
              index === currentStep ? 'bg-primary-600 text-white' : 
              'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {index < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-1 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Render role selection (Step 1)
  const renderRoleSelection = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{steps[0].title}</h2>
        <p className="text-muted-foreground mb-8">Choose your role to access your personalized hub with dashboards, assessments, and relevant privacy compliance tools.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <Icon className="h-16 w-16 text-primary-600 dark:text-primary-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{role.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render role features (Step 2)
  const renderRoleFeatures = () => {
    const role = getSelectedRole();
    if (!role) return null;
    
    const Icon = role.icon;
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{steps[1].title}</h2>
        <p className="text-muted-foreground mb-8">{steps[1].description}</p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 mb-8">
          <div className="flex items-center mb-6">
            <Icon className="h-16 w-16 text-primary-600 dark:text-primary-400 mr-6" />
            <div>
              <h3 className="text-2xl font-semibold">{role.title}</h3>
              <p className="text-muted-foreground">{role.description}</p>
            </div>
          </div>
          
          <h4 className="font-medium mb-4">Key Features:</h4>
          <ul className="space-y-3">
            {role.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          These features are tailored specifically for the {role.id.replace('-', ' ')} role, but you can always explore other role hubs as needed.
        </p>
        
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleSkipToRole}>
            Skip to {role.title} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  // Render final step (Step 3)
  const renderGetStarted = () => {
    const role = getSelectedRole();
    if (!role) return null;
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{steps[2].title}</h2>
        <p className="text-muted-foreground mb-8">{steps[2].description}</p>
        
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 rounded-lg border p-8 text-center mb-8">
          <h3 className="text-xl font-semibold mb-4">You're all set to explore the {role.title}!</h3>
          <p className="text-muted-foreground mb-6">
            You'll have access to role-specific dashboards, assessments, and resources designed to help you navigate privacy compliance with confidence.
          </p>
          
          <Button size="lg" onClick={() => navigate(role.path)}>
            Enter {role.title} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          You can always switch to a different role hub from the navigation menu.
        </p>
      </div>
    );
  };
  
  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderRoleSelection();
      case 1:
        return renderRoleFeatures();
      case 2:
        return renderGetStarted();
      default:
        return renderRoleSelection();
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {renderStepIndicators()}
      
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border shadow-md p-8">
        {renderCurrentStep()}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 0 ? (
          <Button variant="outline" onClick={handlePrevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <div></div> // Empty div for spacing
        )}
        
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNextStep} disabled={currentStep === 0 && !selectedRole}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNextStep}>
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}