import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useNotifications, createNotification } from '../contexts/NotificationContext';
import { administratorAssessments } from '../data/administratorAssessments';
import { useUser, useAssessmentResults } from '../hooks/useSupabase';
import { teacherAssessments } from '../data/teacherAssessments';
import { itStaffAssessments } from '../data/itStaffAssessments';
import { studentAssessments } from '../data/studentAssessments';
import { AnonymousBrowsingNotice } from '../components/auth/AnonymousBrowsingNotice';
import { getQuestionsForArea } from '../data/assessmentQuestions';
import { QuestionnaireComponent } from '../components/assessments/QuestionnaireComponent';

export function AssessmentQuestionnairePage() {
  const { role, assessmentId } = useParams<{ role: string; assessmentId: string }>();
  const [assessmentMode, setAssessmentMode] = useState<'maturity' | 'questions'>('questions');
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
  const [maturityResponses, setMaturityResponses] = useState<{ [areaId: string]: number }>({});
  const [questionResponses, setQuestionResponses] = useState<{ [questionId: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

  // Supabase hooks
  const { user } = useUser();
  const { saveResult } = useAssessmentResults(user?.id);

  // Get the correct assessment data based on role
  const getAssessmentsByRole = (role: string) => {
    switch (role) {
      case 'administrator':
        return administratorAssessments;
      case 'teacher':
        return teacherAssessments;
      case 'it-staff':
        return itStaffAssessments;
      case 'student':
        return studentAssessments;
      default:
        return [];
    }
  };

  // Find the assessment based on role and assessmentId
  const assessments = getAssessmentsByRole(role || '');
  const assessment = assessments.find(a => a.id === assessmentId);

  // Get questions for current area
  const currentArea = assessment?.areas[currentAreaIndex];
  const areaQuestions = currentArea ? getQuestionsForArea(currentArea.id) : [];
  const hasQuestions = areaQuestions.length > 0;

  if (!assessment) {
    return (
      <div className="container py-8">
        <AnonymousBrowsingNotice />
        <Breadcrumb />
        <div className="text-center bg-white dark:bg-gray-900 rounded-lg border p-12">
          <div className="max-w-md mx-auto">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Assessment Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The requested assessment could not be found. It may have been moved or is no longer available.
            </p>
            <div className="space-y-3">
              <Link to="/assessment">
                <Button className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Assessments
                </Button>
              </Link>
              <Link to={`/assessments/${role}`}>
                <Button variant="outline" className="w-full">
                  View {role?.charAt(0).toUpperCase() + role?.slice(1)} Assessments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <AnonymousBrowsingNotice />
        <Breadcrumb />
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Loading Assessment</h2>
            <p className="text-muted-foreground">Please wait while we prepare your assessment...</p>
          </div>
        </div>
      </div>
    );
  }

  const isLastArea = currentAreaIndex === assessment.areas.length - 1;
  const hasMaturityResponse = maturityResponses[currentArea.id] !== undefined;
  const hasQuestionResponses = areaQuestions.every(q => questionResponses[q.id] !== undefined);
  const hasResponse = assessmentMode === 'maturity' ? hasMaturityResponse : hasQuestionResponses;

  const handleResponse = (stateIndex: number) => {
    setMaturityResponses(prev => ({
      ...prev,
      [currentArea.id]: stateIndex
    }));
  };

  const handleQuestionComplete = (responses: Record<string, number>) => {
    setQuestionResponses(prev => ({ ...prev, ...responses }));
    
    // Move to next area or complete assessment
    if (isLastArea) {
      setShowConfirmation(true);
    } else {
      setCurrentAreaIndex(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastArea) {
      setShowConfirmation(true);
    } else {
      setCurrentAreaIndex(prev => prev + 1);
    }
  };

  const handleConfirmSubmission = () => {
    setIsLoading(true);
    // Simulate processing time
    const saveAssessmentResults = async () => {
      try {
        // Calculate results
        const results = assessmentMode === 'maturity' ? calculateMaturityResults() : calculateQuestionResults();
        
        if (user) {
          // If user is logged in, save results
          // Prepare assessment results for each area
          const assessmentResults = assessment.areas.map(area => {
            const areaResponse = assessmentMode === 'maturity' 
              ? maturityResponses[area.id] 
              : getAreaScoreFromQuestions(area.id);
              
            return {
              user_id: user.id,
              assessment_type: role as 'administrator' | 'teacher' | 'it-staff' | 'student',
              assessment_id: assessmentId || '',
              area_id: area.id,
              area_title: area.title,
              current_level: areaResponse + 1, // Convert zero-based index to 1-5 scale
              score: results.percentage,
              gap_indicators: area.gapIndicators,
              remediation_actions: area.remediationActions,
              responses: { response: areaResponse }
            };
          });
          
          // Save all results to Supabase
          for (const result of assessmentResults) {
            await saveResult(result);
          }
        }
        else {
          console.log('User not logged in, assessment results not saved');
        }
      
        // Add completion notification
        if (assessment) {
          addNotification(createNotification.assessmentCompleted(
            assessment.title,
            results.percentage,
            `/assessments/${role}`
          ));
        }
        
        setIsLoading(false);
        setShowConfirmation(false);
        setShowResults(true);
      } catch (error) {
        console.error('Error saving assessment results:', error);
        setIsLoading(false);
        // Show error message to user
        
        // Save to local storage if we're offline but have a userId
        if (!navigator.onLine && user) {
          try {
            // Create local results with generated IDs
            assessment.areas.map(area => ({
              id: `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
              user_id: user.id,
              assessment_type: role as 'administrator' | 'teacher' | 'it-staff' | 'student',
              assessment_id: assessmentId || '',
              area_id: area.id,
              area_title: area.title,
              current_level: maturityResponses[area.id] + 1,
              score: results.percentage,
              completed_at: new Date().toISOString()
            }));
          } catch (localError) {
            console.error('Error saving to local storage:', localError);
          }
        }
        
        addNotification({
          type: 'error',
          title: 'Error Saving Results',
          message: 'There was a problem saving your assessment results. Please try again.',
          timestamp: Date.now(),
          read: false,
          category: 'assessment'
        });
      }
    };
    
    saveAssessmentResults();
  };

  const handlePrevious = () => {
    if (currentAreaIndex > 0) {
      setCurrentAreaIndex(prev => prev - 1);
    }
  };

  const calculateMaturityResults = () => {
    const totalAreas = assessment.areas.length;
    const totalScore = Object.values(maturityResponses).reduce((sum, score) => sum + (score + 1), 0);
    const maxScore = totalAreas * 5;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let maturityLevel = 'Level 1 - Initial';
    if (percentage >= 81) maturityLevel = 'Level 5 - Optimized';
    else if (percentage >= 61) maturityLevel = 'Level 4 - Managed';
    else if (percentage >= 41) maturityLevel = 'Level 3 - Defined';
    else if (percentage >= 21) maturityLevel = 'Level 2 - Developing';

    return { percentage, maturityLevel, totalScore, maxScore };
  };

  const calculateQuestionResults = () => {
    const allQuestions = assessment.areas.flatMap(area => getQuestionsForArea(area.id));
    const results = calculateAssessmentScore(questionResponses, allQuestions);
    
    let maturityLevel = 'Level 1 - Initial';
    if (results.score >= 81) maturityLevel = 'Level 5 - Optimized';
    else if (results.score >= 61) maturityLevel = 'Level 4 - Managed';
    else if (results.score >= 41) maturityLevel = 'Level 3 - Defined';
    else if (results.score >= 21) maturityLevel = 'Level 2 - Developing';

    return { 
      percentage: results.score, 
      maturityLevel, 
      totalScore: results.correctAnswers, 
      maxScore: allQuestions.length 
    };
  };

  const getAreaScoreFromQuestions = (areaId: string): number => {
    const areaQuestions = getQuestionsForArea(areaId);
    if (areaQuestions.length === 0) return 3; // Default to Level 3
    
    const results = calculateAssessmentScore(questionResponses, areaQuestions);
    // Convert percentage to maturity level (1-5)
    if (results.score >= 81) return 5;
    if (results.score >= 61) return 4;
    if (results.score >= 41) return 3;
    if (results.score >= 21) return 2;
    return 1;
  };

  // Confirmation Dialog
  if (showConfirmation) {
    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <AnonymousBrowsingNotice />
        <Breadcrumb />
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-8">
          <div className="text-center mb-6">
            <CheckCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Ready to Submit?</h1>
            <p className="text-muted-foreground">
              You've completed all {assessment.areas.length} assessment areas. 
              Once submitted, you'll receive your results and personalized recommendations.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Assessment mode: {assessmentMode === 'maturity' ? 'Maturity Level Assessment' : 'Knowledge Questions'}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Assessment Summary:</h3>
            <ul className="text-sm space-y-1">
              <li>• {assessment.title}</li>
              <li>• {assessment.areas.length} areas completed</li>
              <li>• Estimated time: {assessment.estimatedTime} minutes</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmation(false)}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Review Answers
            </Button>
            <Button 
              onClick={handleConfirmSubmission}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Submit Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = assessmentMode === 'maturity' ? calculateMaturityResults() : calculateQuestionResults();
    
    return (
      <div className="container py-8 max-w-4xl mx-auto">
        <AnonymousBrowsingNotice />
        <Breadcrumb />

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
            <p className="text-muted-foreground">
              You've completed the {assessment.title} assessment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {results.percentage}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-lg font-semibold mb-2">{results.maturityLevel}</div>
              <div className="text-sm text-muted-foreground">Maturity Level</div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Responses</h2>
            {assessment.areas.map((area) => {
              let responseIndex, selectedState;
              
              if (assessmentMode === 'maturity') {
                responseIndex = maturityResponses[area.id];
                selectedState = area.currentStates[responseIndex];
              } else {
                getQuestionsForArea(area.id);
                const areaScore = getAreaScoreFromQuestions(area.id);
                responseIndex = areaScore - 1;
                selectedState = area.currentStates[responseIndex] || area.currentStates[2];
              }
              
              return (
                <div key={area.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium">{area.title}</h3>
                    <Badge level={
                      responseIndex === 0 ? 'beginner' :
                      responseIndex === 1 ? 'beginner' :
                      responseIndex === 2 ? 'intermediate' :
                      responseIndex === 3 ? 'intermediate' : 'advanced'
                    }>
                      {selectedState.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{selectedState.description}</p>
                  
                  {responseIndex < 3 && (
                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded border-l-4 border-amber-400">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Improvement Opportunity
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            {area.remediationActions[`Level ${responseIndex + 1}→${responseIndex + 2}`]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 mt-8">
            <Link to={`/role/${role}?tab=assessments`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Assessments
              </Button>
            </Link>
            <Link to="/resources">
              <Button>
                <BookOpen className="mr-2 h-4 w-4" />
                View Resources
              </Button>
            </Link>
            <Link to="/certificate">
              <Button variant="outline">
                View Certificate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <AnonymousBrowsingNotice />
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{assessment.title}</h1>
        <p className="text-muted-foreground mb-4">{assessment.description}</p>
        
        {/* Assessment Mode Toggle */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-medium">Assessment Mode:</span>
          <div className="flex gap-2">
            <Button
              variant={assessmentMode === 'questions' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAssessmentMode('questions')}
            >
              Knowledge Questions
            </Button>
            <Button
              variant={assessmentMode === 'maturity' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAssessmentMode('maturity')}
            >
              Maturity Assessment
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {assessmentMode === 'questions' ? 'Area' : 'Question'} {currentAreaIndex + 1} of {assessment.areas.length}
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentAreaIndex + 1) / assessment.areas.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {assessmentMode === 'questions' && hasQuestions ? (
        <QuestionnaireComponent
          questions={areaQuestions}
          onComplete={handleQuestionComplete}
          assessmentTitle={`${currentArea.title} - ${assessment.title}`}
        />
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{currentArea.title}</h2>
            <p className="text-muted-foreground">{currentArea.description}</p>
            {assessmentMode === 'questions' && !hasQuestions && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  No questions available for this area. Switching to maturity assessment mode.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {currentArea.currentStates.map((state, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  maturityResponses[currentArea.id] === index
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name={`area-${currentArea.id}`}
                  value={index}
                  checked={maturityResponses[currentArea.id] === index}
                  onChange={() => handleResponse(index)}
                  className="sr-only"
                />
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 ${
                    maturityResponses[currentArea.id] === index
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {maturityResponses[currentArea.id] === index && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">
                      {String.fromCharCode(65 + index)}) {state.level}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {state.description}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentAreaIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!hasResponse}
            >
              {isLastArea ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}