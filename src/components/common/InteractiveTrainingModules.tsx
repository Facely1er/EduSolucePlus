// Enhanced interactive training modules for real business use
import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Award, 
  Target,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { interactiveModules, type InteractiveModule } from '../../data/interactiveTrainingModulesData';

interface InteractiveTrainingModulesProps {
  moduleId: string;
  onProgress?: (progress: number) => void;
  onComplete?: (score: number) => void;
}

export function InteractiveTrainingModules({ 
  moduleId, 
  onProgress, 
  onComplete 
}: InteractiveTrainingModulesProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [moduleData, setModuleData] = useState<InteractiveModule | null>(null);

  // Use imported modules data for better Fast Refresh support
  const modules = interactiveModules;

  useEffect(() => {
    const module = modules[moduleId];
    if (module) {
      setModuleData(module);
    }
  }, [moduleId, modules]);

  useEffect(() => {
    if (onProgress && moduleData) {
      const totalSteps = moduleData.scenarios.length + moduleData.assessments.length;
      const progress = Math.round((currentStep / totalSteps) * 100);
      onProgress(progress);
    }
  }, [currentStep, moduleData, onProgress]);

  const handleComplete = useCallback(() => {
    if (onComplete && moduleData) {
      const totalQuestions = moduleData.assessments.length;
      const correctAnswers = moduleData.assessments.filter((assessment, index) => {
        const response = responses[`assessment-${index}`];
        return response === assessment.correctAnswer;
      }).length;
      
      const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
      onComplete(score);
    }
    setShowResults(true);
  }, [onComplete, moduleData, responses]);

  const handleNext = useCallback(() => {
    if (moduleData) {
      const totalSteps = moduleData.scenarios.length + moduleData.assessments.length;
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleComplete();
      }
    }
  }, [moduleData, currentStep, handleComplete]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleResponse = useCallback((responseData: string | number) => {
    setResponses(prev => ({
      ...prev,
      [currentStep]: responseData
    }));
  }, [currentStep]);

  if (!moduleData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Module Not Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            The requested training module could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const totalQuestions = moduleData.assessments.length;
    const correctAnswers = moduleData.assessments.filter((assessment, index) => {
      const response = responses[`assessment-${index}`];
      return response === assessment.correctAnswer;
    }).length;
    
    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const passed = score >= 70;

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <Award className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {passed 
              ? 'You have successfully completed this training module.'
              : 'You\'re on the right track! Review the material and try again.'
            }
          </p>
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {score}%
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {moduleData.assessments.map((assessment, index) => {
            const response = responses[`assessment-${index}`];
            const isCorrect = response === assessment.correctAnswer;
            
            return (
              <div key={assessment.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center">
                        <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Question {index + 1}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {assessment.question}
                    </p>
                    <div className="space-y-2 mb-3">
                      {assessment.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded text-sm ${
                            optionIndex === assessment.correctAnswer
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : optionIndex === response && !isCorrect
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Explanation:</strong> {assessment.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => {
              setCurrentStep(0);
              setResponses({});
              setShowResults(false);
            }}
            variant="outline"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Module
          </Button>
        </div>
      </div>
    );
  }

  const currentScenario = moduleData.scenarios[currentStep];
  const currentAssessment = moduleData.assessments[currentStep - moduleData.scenarios.length];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {moduleData.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {moduleData.description}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {moduleData.estimatedTime} min
            </span>
            <span className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              {moduleData.difficulty}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.round((currentStep / (moduleData.scenarios.length + moduleData.assessments.length)) * 100)}%` 
            }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Step {currentStep + 1} of {moduleData.scenarios.length + moduleData.assessments.length}
        </p>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        {currentScenario ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {currentScenario.title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Context</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentScenario.context}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Challenge</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentScenario.challenge}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Choose your response:</h3>
                <div className="space-y-3">
                  {currentScenario.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleResponse(option.id)}
                      className="w-full text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white mb-1">
                        {option.text}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.consequence}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : currentAssessment ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Assessment Question
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {currentAssessment.question}
              </p>
              <div className="space-y-2">
                {currentAssessment.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponse(index)}
                    className="w-full text-left p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {currentStep === moduleData.scenarios.length + moduleData.assessments.length - 1 ? (
            <Button onClick={handleComplete}>
              <Award className="h-4 w-4 ml-2" />
              Complete Module
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}