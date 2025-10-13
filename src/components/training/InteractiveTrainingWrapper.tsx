// src/components/training/InteractiveTrainingWrapper.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

// Import your interactive components (FIXED IMPORT PATHS)
import FERPAInteractiveModule from './FERPAInteractiveModule';
import CybersecuritySimulator from './CybersecuritySimulator';
import EduSoluceTrainingPlatform from './EduSoluceTrainingPlatform';
import { trainingModules } from '../../data/trainingModulesData';


export function InteractiveTrainingWrapper() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (moduleId) {
      const foundModule = trainingModules.find(m => m.id === moduleId);
      setModule(foundModule);
      setLoading(false);
    }
  }, [moduleId]);

  const handleProgressUpdate = async (progress: number, completed: boolean = false) => {
    // Integrate with your existing progress tracking
    console.log(`Progress updated: ${progress}% ${completed ? '(Completed)' : ''}`);
  };

  const handleModuleComplete = async () => {
    await handleProgressUpdate(100, true);
    navigate(`/training/${moduleId}?completed=true`);
  };

  const renderInteractiveComponent = () => {
    if (!module) return null;

    // Map modules to their interactive components
    const getComponentForModule = (moduleId: string) => {
      if (moduleId.includes('ferpa')) return FERPAInteractiveModule;
      if (moduleId.includes('cybersecurity')) return CybersecuritySimulator;
      if (moduleId.includes('gdpr')) return EduSoluceTrainingPlatform;
      if (moduleId.includes('coppa')) return EduSoluceTrainingPlatform;
      return FERPAInteractiveModule; // Default fallback
    };

    const InteractiveComponent = getComponentForModule(module.id);

    return (
      <InteractiveComponent 
        moduleData={module}
        moduleId={module.id}
        onProgressUpdate={handleProgressUpdate}
        onComplete={handleModuleComplete}
        userId={module.user?.id}
      />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Loading interactive training...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Module not found</h3>
          <p className="text-gray-600 mb-4">Module ID: {moduleId}</p>
          <Button
            onClick={() => navigate('/training')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Training
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <div className="bg-white border-b px-4 py-3">
        <Button
          variant="ghost"
          onClick={() => navigate('/training')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Training Modules
        </Button>
      </div>
      
      {/* Interactive Component */}
      {renderInteractiveComponent()}
    </div>
  );
}