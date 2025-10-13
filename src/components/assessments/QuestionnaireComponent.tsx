import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AssessmentQuestion, calculateAssessmentScore } from '../../data/assessmentQuestions';

interface QuestionnaireComponentProps {
  questions: AssessmentQuestion[];
  onComplete: (responses: Record<string, number>, score: number) => void;
  assessmentTitle: string;
}

export function QuestionnaireComponent({ 
  questions, 
  onComplete, 
  assessmentTitle 
}: QuestionnaireComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasResponse = responses[currentQuestion?.id] !== undefined;

  const handleAnswer = (answerIndex: number) => {
    if (!currentQuestion) return;
    
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score and complete
      const results = calculateAssessmentScore(responses, questions);
      onComplete(responses, results.score);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h3 className="font-medium mb-2">No questions available</h3>
        <p className="text-muted-foreground">This assessment area doesn't have questions configured yet.</p>
      </div>
    );
  }

  const userAnswer = responses[currentQuestion.id];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-8">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{assessmentTitle}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Badge level={currentQuestion.difficulty as "beginner" | "intermediate" | "advanced"}>
            {currentQuestion.difficulty}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {currentQuestion.points} points
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
        
        {/* Answer options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={hasResponse}
              className={`w-full text-left p-4 border rounded-lg transition-colors ${
                userAnswer === index
                  ? showExplanation
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                      : 'border-red-500 bg-red-50 dark:bg-red-950/30'
                    : 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                  : showExplanation && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } ${hasResponse ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  userAnswer === index
                    ? 'border-current bg-current text-white'
                    : showExplanation && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600'
                }`}>
                  <span className="text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <span>{option}</span>
                {showExplanation && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect
            ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            )}
            <div>
              <p className={`font-medium mb-2 ${
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              }`}>
                {isCorrect ? 'Correct!' : 'Incorrect.'}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!hasResponse}
        >
          {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}