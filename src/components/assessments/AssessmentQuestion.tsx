import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface AssessmentQuestionProps {
  question: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
  };
  questionNumber: number;
  totalQuestions: number;
  timeRemaining?: number;
  onAnswer: (answer: number) => void;
  onSkip?: () => void;
  showExplanation?: boolean;
  selectedAnswer?: number;
}

export function AssessmentQuestion({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  onAnswer,
  onSkip,
  showExplanation = false,
  selectedAnswer
}: AssessmentQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(selectedAnswer || null);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedOption(answerIndex);
    onAnswer(answerIndex);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge className={getDifficultyColor(question.difficulty)}>
            {question.difficulty}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {question.points} points
          </span>
        </div>
        {timeRemaining !== undefined && (
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">{question.question}</h2>
        
        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = showExplanation && index === question.correctAnswer;
            const isIncorrect = showExplanation && isSelected && index !== question.correctAnswer;
            
            return (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswer(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                    : isIncorrect
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                    : isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isCorrect
                      ? 'border-green-500 bg-green-500'
                      : isIncorrect
                      ? 'border-red-500 bg-red-500'
                      : isSelected
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {isCorrect && <CheckCircle className="h-4 w-4 text-white" />}
                    {isIncorrect && <XCircle className="h-4 w-4 text-white" />}
                    {!showExplanation && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="flex-1">{option}</span>
                  {isCorrect && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  {isIncorrect && <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Explanation:</h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">{question.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="text-muted-foreground"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Hint
          </Button>
          {onSkip && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground"
            >
              Skip Question
            </Button>
          )}
        </div>
        
        {!showExplanation && selectedOption !== null && (
          <Button onClick={() => onAnswer(selectedOption)}>
            Submit Answer
          </Button>
        )}
      </div>

      {/* Hint */}
      {showHint && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            💡 Consider the specific requirements and scope of the regulation being tested.
          </p>
        </div>
      )}
    </div>
  );
}