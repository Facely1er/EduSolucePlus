import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Clock, Users, ChevronRight, ChevronLeft, Award, AlertTriangle, FileText, Eye, Lock, BookOpen, Download } from 'lucide-react';

interface FERPAInteractiveModuleProps {
  moduleData?: Record<string, unknown>;
  onProgressUpdate?: (progress: number, completed?: boolean) => void;
  onComplete?: () => void;
  userId?: string;
}

const FERPAInteractiveModule: React.FC<FERPAInteractiveModuleProps> = ({
  moduleData: externalModuleData,
  onProgressUpdate,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Fallback to default module data if none provided
  const moduleData = externalModuleData || {
    title: "FERPA Fundamentals for Educational Administrators",
    description: "Master the essentials of student privacy protection under the Family Educational Rights and Privacy Act",
    duration: "120 minutes",
    level: "Beginner",
    sections: [
      {
        id: 'introduction',
        title: 'FERPA Overview & Scope',
        duration: 25,
        icon: <Shield className="w-6 h-6" />,
        content: {
          overview: "Understanding the foundation and reach of FERPA in educational settings",
          keyPoints: [
            "FERPA applies to educational institutions that receive federal funding",
            "Protects privacy of student education records",
            "Grants specific rights to parents and eligible students",
            "Violations can result in loss of federal funding"
          ],
          interactiveContent: {
            type: 'scenario',
            title: 'Institution Coverage Assessment',
            description: 'Determine if your institution is covered by FERPA',
            scenarios: [
              {
                situation: "Springfield Elementary School receives Title I funding from the Department of Education. Are they covered by FERPA?",
                options: ["Yes, they receive federal funding", "No, only high schools are covered", "Only if they have over 500 students", "Only private schools are covered"],
                correct: 0,
                explanation: "Any educational institution that receives federal funding from the Department of Education must comply with FERPA, regardless of size or grade level."
              },
              {
                situation: "A private tutoring company works with individual students but doesn't receive any federal funding. Are they subject to FERPA?",
                options: ["Yes, all educational services are covered", "No, they must receive federal funding to be covered", "Only if they work with public school students", "Yes, if they handle education records"],
                correct: 1,
                explanation: "FERPA only applies to educational institutions that receive federal funding. Private companies that don't receive such funding are not directly covered by FERPA."
              }
            ]
          }
        }
      },
      {
        id: 'records',
        title: 'Education Records Deep Dive',
        duration: 20,
        icon: <FileText className="w-6 h-6" />,
        content: {
          overview: "Learn what constitutes education records and what's excluded",
          keyPoints: [
            "Education records contain personally identifiable information about students",
            "Sole possession records (personal notes) are excluded",
            "Law enforcement records are excluded",
            "Employment records and alumni records are excluded"
          ],
          interactiveContent: {
            type: 'classification',
            title: 'Record Classification Exercise',
            description: 'Classify each item as an education record or not',
            items: [
              {
                item: "Student's transcript showing grades and courses",
                type: "Education Record",
                explanation: "Transcripts contain personally identifiable information directly related to a student and are maintained by the institution."
              },
              {
                item: "Teacher's personal notes about student behavior kept in private desk",
                type: "Not an Education Record",
                explanation: "Personal notes kept in the sole possession of the teacher and not shared with others are excluded from the definition of education records."
              },
              {
                item: "Disciplinary action report filed with the principal",
                type: "Education Record",
                explanation: "Disciplinary records maintained by the school are education records as they contain information about the student's educational experience."
              },
              {
                item: "Campus security incident report involving a student",
                type: "Not an Education Record",
                explanation: "Law enforcement records created and maintained by law enforcement units are excluded from education records."
              },
              {
                item: "Student's special education assessment results",
                type: "Education Record",
                explanation: "Special education records are education records that require special protection and have additional disclosure requirements."
              }
            ]
          }
        }
      },
      {
        id: 'rights',
        title: 'Student & Parent Rights',
        duration: 25,
        icon: <Eye className="w-6 h-6" />,
        content: {
          overview: "Understand the core rights FERPA provides to parents and students",
          keyPoints: [
            "Right to inspect and review education records",
            "Right to request amendment of inaccurate records",
            "Right to a hearing if amendment is denied",
            "Rights transfer to student at age 18 or college enrollment"
          ],
          interactiveContent: {
            type: 'timeline',
            title: 'Rights Request Timeline',
            description: 'Learn the proper timeline for handling rights requests',
            timeline: [
              {
                day: 0,
                event: "Parent/Student submits written request to inspect records",
                action: "Acknowledge receipt and schedule review within 45 days"
              },
              {
                day: 45,
                event: "Maximum time to provide access to records",
                action: "Must provide opportunity to inspect and review records"
              },
              {
                day: "After Review",
                event: "Parent/Student may request amendment",
                action: "Consider request and respond within reasonable time"
              },
              {
                day: "If Denied",
                event: "Parent/Student may request hearing",
                action: "Provide hearing within reasonable time"
              }
            ]
          }
        }
      },
      {
        id: 'directory',
        title: 'Directory Information',
        duration: 20,
        icon: <BookOpen className="w-6 h-6" />,
        content: {
          overview: "Balance transparency with privacy through proper directory information management",
          keyPoints: [
            "Directory information can be disclosed without consent",
            "Must provide annual notice of directory information categories",
            "Students/parents have right to opt out",
            "Common directory info: name, address, phone, email, dates of attendance"
          ],
          interactiveContent: {
            type: 'builder',
            title: 'Directory Information Policy Builder',
            description: 'Build a compliant directory information policy',
            sections: [
              {
                title: "Define Directory Information Categories",
                options: [
                  "Student name", "Address", "Phone number", "Email address",
                  "Date and place of birth", "Major field of study", "Dates of attendance",
                  "Grade level", "Enrollment status", "Degrees and awards received",
                  "Most recent educational institution attended", "Participation in activities/sports",
                  "Weight and height of athletic team members", "Student photographs"
                ],
                selected: []
              },
              {
                title: "Annual Notification Method",
                options: [
                  "Student handbook", "Newsletter", "Website posting", "Direct mail",
                  "Email notification", "School newspaper", "Registration materials"
                ],
                selected: []
              }
            ]
          }
        }
      },
      {
        id: 'disclosure',
        title: 'Disclosure Rules',
        duration: 25,
        icon: <Lock className="w-6 h-6" />,
        content: {
          overview: "Navigate the complex rules for sharing student information",
          keyPoints: [
            "Generally requires written consent for non-directory information",
            "School officials with legitimate educational interest exception",
            "Emergency disclosure for health and safety",
            "Comply with judicial orders and lawfully issued subpoenas"
          ],
          interactiveContent: {
            type: 'decision-tree',
            title: 'Disclosure Decision Tool',
            description: 'Determine if disclosure is permitted',
            decisionFlow: [
              {
                question: "Is the information directory information and has the student not opted out?",
                yesPath: "permitted",
                noPath: "next",
                yesText: "Disclosure is permitted without consent",
                noText: "Continue evaluation"
              },
              {
                question: "Do you have written consent from parent/eligible student?",
                yesPath: "permitted",
                noPath: "next",
                yesText: "Disclosure is permitted with consent",
                noText: "Check for exceptions"
              },
              {
                question: "Is the requestor a school official with legitimate educational interest?",
                yesPath: "permitted",
                noPath: "next",
                yesText: "Disclosure permitted under school official exception",
                noText: "Check other exceptions"
              },
              {
                question: "Is this an emergency situation threatening health or safety?",
                yesPath: "permitted",
                noPath: "denied",
                yesText: "Emergency disclosure may be permitted - document carefully",
                noText: "Disclosure not permitted - seek consent or legal authority"
              }
            ]
          }
        }
      },
      {
        id: 'implementation',
        title: 'Implementation & Compliance',
        duration: 5,
        icon: <CheckCircle className="w-6 h-6" />,
        content: {
          overview: "Create sustainable FERPA compliance in your institution",
          keyPoints: [
            "Develop comprehensive FERPA policies and procedures",
            "Train all staff who handle education records",
            "Implement regular compliance monitoring",
            "Establish incident response procedures"
          ],
          interactiveContent: {
            type: 'checklist',
            title: 'FERPA Implementation Checklist',
            description: 'Essential steps for FERPA compliance',
            categories: [
              {
                title: "Policy Development",
                items: [
                  "Written FERPA policy addressing all key requirements",
                  "Directory information categories clearly defined",
                  "Procedures for handling rights requests",
                  "Emergency disclosure protocols",
                  "Record retention and disposal procedures"
                ]
              },
              {
                title: "Staff Training",
                items: [
                  "Initial FERPA training for all relevant staff",
                  "Annual refresher training program",
                  "Role-specific training for different positions",
                  "Documentation of training completion",
                  "New employee FERPA orientation"
                ]
              },
              {
                title: "Operational Procedures",
                items: [
                  "Secure storage of education records",
                  "Access controls and audit trails",
                  "Disclosure tracking and documentation",
                  "Incident reporting procedures",
                  "Regular compliance assessments"
                ]
              }
            ]
          }
        }
      }
    ]
  };

  const [checklistProgress, setChecklistProgress] = useState({});

  const handleChecklistToggle = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setChecklistProgress(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Update progress whenever current step changes
  useEffect(() => {
    if (onProgressUpdate && moduleData.sections.length > 0) {
      const progressPercentage = Math.round(((currentStep + 1) / moduleData.sections.length) * 100);
      onProgressUpdate(progressPercentage, false);
    }
  }, [currentStep, onProgressUpdate, moduleData.sections.length]);

  const renderSection = () => {
    const section = moduleData.sections[currentStep];
    if (!section) return null;

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Section Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center mb-4">
            {section.icon}
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <div className="flex items-center text-blue-100 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                {section.duration} minutes
              </div>
            </div>
          </div>
          <p className="text-blue-100">{section.content.overview}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Key Points */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Key Learning Points</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {section.content.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Content */}
          {section.content.interactiveContent && renderInteractiveContent(section.content.interactiveContent)}
        </div>
      </div>
    );
  };

  const renderInteractiveContent = (interactive) => {
    switch (interactive.type) {
      case 'scenario':
        return renderScenarios(interactive);
      case 'classification':
        return renderClassification(interactive);
      case 'timeline':
        return renderTimeline(interactive);
      case 'builder':
        return renderBuilder(interactive);
      case 'decision-tree':
        return renderDecisionTree(interactive);
      case 'checklist':
        return renderChecklist(interactive);
      default:
        return null;
    }
  };

  const renderScenarios = (interactive) => (
    <div className="bg-yellow-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
        {interactive.title}
      </h3>
      <p className="text-gray-600 mb-6">{interactive.description}</p>
      
      {interactive.scenarios.map((scenario, index) => (
        <div key={index} className="bg-white rounded-lg p-4 mb-4 border">
          <h4 className="font-medium mb-3">Scenario {index + 1}</h4>
          <p className="text-gray-700 mb-4">{scenario.situation}</p>
          
          <div className="space-y-2 mb-4">
            {scenario.options.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`scenario-${currentStep}-${index}`}
                  value={optionIndex}
                  onChange={(e) => setUserAnswers(prev => ({
                    ...prev,
                    [`scenario-${currentStep}-${index}`]: parseInt(e.target.value)
                  }))}
                  className="mr-3"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          
          {userAnswers[`scenario-${currentStep}-${index}`] !== undefined && (
            <div className={`p-3 rounded-lg ${userAnswers[`scenario-${currentStep}-${index}`] === scenario.correct ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
              <p className="text-sm font-medium mb-1">
                {userAnswers[`scenario-${currentStep}-${index}`] === scenario.correct ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-sm">{scenario.explanation}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderClassification = (interactive) => (
    <div className="bg-green-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{interactive.title}</h3>
      <p className="text-gray-600 mb-6">{interactive.description}</p>
      
      <div className="space-y-4">
        {interactive.items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border">
            <p className="font-medium mb-3">{item.item}</p>
            <div className="flex space-x-4 mb-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`classification-${index}`}
                  value="education"
                  onChange={() => setUserAnswers(prev => ({
                    ...prev,
                    [`classification-${index}`]: 'education'
                  }))}
                  className="mr-2"
                />
                <span className="text-sm">Education Record</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`classification-${index}`}
                  value="not-education"
                  onChange={() => setUserAnswers(prev => ({
                    ...prev,
                    [`classification-${index}`]: 'not-education'
                  }))}
                  className="mr-2"
                />
                <span className="text-sm">Not an Education Record</span>
              </label>
            </div>
            
            {userAnswers[`classification-${index}`] && (
              <div className={`p-3 rounded-lg ${
                (userAnswers[`classification-${index}`] === 'education' && item.type === 'Education Record') ||
                (userAnswers[`classification-${index}`] === 'not-education' && item.type === 'Not an Education Record')
                  ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
              }`}>
                <p className="text-sm font-medium mb-1">
                  {((userAnswers[`classification-${index}`] === 'education' && item.type === 'Education Record') ||
                    (userAnswers[`classification-${index}`] === 'not-education' && item.type === 'Not an Education Record'))
                    ? '✓ Correct!' : `✗ Incorrect - This is ${item.type}`}
                </p>
                <p className="text-sm">{item.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimeline = (interactive) => (
    <div className="bg-purple-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{interactive.title}</h3>
      <p className="text-gray-600 mb-6">{interactive.description}</p>
      
      <div className="relative">
        {interactive.timeline.map((item, index) => (
          <div key={index} className="flex items-start mb-8 last:mb-0">
            <div className="flex-shrink-0 w-24 text-right pr-4">
              <span className="text-sm font-medium text-purple-600">Day {item.day}</span>
            </div>
            <div className="flex-shrink-0 w-4 h-4 bg-purple-600 rounded-full mt-1 relative z-10"></div>
            <div className="flex-grow pl-4">
              <h4 className="font-medium text-gray-900 mb-1">{item.event}</h4>
              <p className="text-sm text-gray-600">{item.action}</p>
            </div>
            {index < interactive.timeline.length - 1 && (
              <div className="absolute left-28 w-px h-8 bg-purple-200 mt-5"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderChecklist = (interactive) => (
    <div className="bg-blue-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{interactive.title}</h3>
      <p className="text-gray-600 mb-6">{interactive.description}</p>
      
      <div className="space-y-6">
        {interactive.categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-lg p-4">
            <h4 className="font-medium mb-4">{category.title}</h4>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <label key={itemIndex} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklistProgress[`${categoryIndex}-${itemIndex}`] || false}
                    onChange={() => handleChecklistToggle(categoryIndex, itemIndex)}
                    className="mr-3"
                  />
                  <span className={`text-sm ${checklistProgress[`${categoryIndex}-${itemIndex}`] ? 'line-through text-gray-500' : ''}`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBuilder = (interactive) => (
    <div className="bg-indigo-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{interactive.title}</h3>
      <p className="text-gray-600 mb-6">{interactive.description}</p>
      {/* Builder implementation would go here */}
      <p className="text-gray-600 italic">Interactive policy builder - implementation details would be expanded based on specific requirements.</p>
    </div>
  );

  const renderDecisionTree = (interactive) => (
    <div className="bg-orange-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{interactive.title}</h3>
      <p className="text-gray-600 mb-6">{interactive.description}</p>
      {/* Decision tree implementation would go here */}
      <p className="text-gray-600 italic">Interactive decision tree - implementation details would be expanded based on specific requirements.</p>
    </div>
  );

  const calculateProgress = () => {
    return Math.round(((currentStep + 1) / moduleData.sections.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{moduleData.title}</h1>
              <p className="text-gray-600 mt-2">{moduleData.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="text-2xl font-bold text-blue-600">{calculateProgress()}%</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          
          {/* Module Info */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {moduleData.duration}
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              {moduleData.level}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              1,250+ enrolled
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {moduleData.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  index === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : index < currentStep 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  section.icon
                )}
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {renderSection()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous Section
          </button>
          
          {currentStep < moduleData.sections.length - 1 ? (
            <button
              onClick={() => {
                setCompletedSections(prev => new Set([...prev, currentStep]));
                setCurrentStep(currentStep + 1);
                
                // Call progress update function
                if (onProgressUpdate && moduleData.sections.length > 0) {
                  const progressPercentage = Math.round(((currentStep + 2) / moduleData.sections.length) * 100);
                  onProgressUpdate(progressPercentage, false);
                }
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
            >
              Next Section
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center"
            >
              Complete Module
              <Award className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>

        {/* Completion Modal */}
        {showResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
                <p className="text-gray-600 mb-6">
                  You have successfully completed the {moduleData.title} training module.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      if (onComplete) onComplete();
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Continue Learning
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 flex items-center justify-center">
                    <Download className="w-4 h-4 mr-1" />
                    Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FERPAInteractiveModule;