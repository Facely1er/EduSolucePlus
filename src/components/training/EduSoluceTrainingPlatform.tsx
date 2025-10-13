import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Clock, Users, Star, Award, Book, Shield, Lock, Brain, Target, Download, ExternalLink } from 'lucide-react';

const EduSoluceTrainingPlatform = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [currentLesson, setCurrentLesson] = useState(0);

  const [showCertificate, setShowCertificate] = useState(false);

  const trainingModules = [
    {
      id: 'ferpa',
      title: 'FERPA Fundamentals Guide for Administrators',
      duration: 120,
      level: 'Beginner',
      category: 'Compliance',
      description: 'Essential understanding of the Family Educational Rights and Privacy Act for school administrators',
      color: 'bg-blue-500',
      icon: <Shield className="w-6 h-6" />,
      tags: ['compliance', 'FERPA', 'beginner'],
      enrolled: 1250,
      rating: 4.8,
      lessons: [
        {
          title: 'FERPA Foundations',
          duration: 25,
          content: 'Understanding the basic framework and purpose of FERPA, covered institutions, and enforcement mechanisms.',
          quiz: [
            {
              question: 'Which institutions are covered by FERPA?',
              options: ['All schools', 'Only public schools', 'Schools receiving federal funding', 'Private schools only'],
              correct: 2
            }
          ]
        },
        {
          title: 'Education Records Deep Dive',
          duration: 20,
          content: 'Comprehensive understanding of what constitutes education records, exclusions, and record ownership.',
          quiz: [
            {
              question: 'Which of these is NOT considered an education record?',
              options: ['Grade reports', 'Disciplinary records', 'Teacher personal notes', 'Attendance records'],
              correct: 2
            }
          ]
        },
        {
          title: 'Student and Parent Rights',
          duration: 25,
          content: 'Managing core rights including inspection, amendment, hearings, and rights transfer at majority.',
          quiz: [
            {
              question: 'At what age do rights transfer from parents to students?',
              options: ['16', '17', '18', '21'],
              correct: 2
            }
          ]
        },
        {
          title: 'Directory Information Management',
          duration: 20,
          content: 'Balancing transparency with privacy in directory information, annual notifications, and opt-out procedures.',
          quiz: [
            {
              question: 'Directory information can be disclosed without consent if:',
              options: ['Student has not opted out', 'Parent requests it', 'School needs it', 'All of the above'],
              correct: 0
            }
          ]
        },
        {
          title: 'Disclosure Rules and Exceptions',
          duration: 25,
          content: 'Understanding consent requirements, school official exceptions, emergency situations, and legal compliance.',
          quiz: [
            {
              question: 'Which requires written consent for disclosure?',
              options: ['Directory information', 'School officials with legitimate interest', 'Non-directory education records', 'Emergency situations'],
              correct: 2
            }
          ]
        },
        {
          title: 'Implementation and Compliance',
          duration: 5,
          content: 'Creating sustainable FERPA compliance through policy development, training, and monitoring.',
          quiz: [
            {
              question: 'How often should FERPA training be conducted?',
              options: ['Once per year', 'When new staff join', 'When policies change', 'All of the above'],
              correct: 3
            }
          ]
        }
      ]
    },
    {
      id: 'gdpr',
      title: 'GDPR Compliance Guide for Educational Institutions',
      duration: 140,
      level: 'Advanced',
      category: 'Privacy',
      description: 'Comprehensive GDPR guide for schools with international students or EU operations',
      color: 'bg-purple-500',
      icon: <Lock className="w-6 h-6" />,
      tags: ['privacy', 'GDPR', 'advanced'],
      enrolled: 450,
      rating: 4.8,
      lessons: [
        {
          title: 'GDPR Scope in Education',
          duration: 20,
          content: 'When and how GDPR applies to educational institutions, territorial scope, and interaction with national laws.',
          quiz: [
            {
              question: 'GDPR applies to educational institutions when:',
              options: ['Located in EU', 'Processing EU residents data', 'Both A and B', 'Never applies to schools'],
              correct: 2
            }
          ]
        },
        {
          title: 'Lawful Basis for Educational Data Processing',
          duration: 25,
          content: 'Establishing proper legal grounds for student data processing under Article 6 and special categories.',
          quiz: [
            {
              question: 'Which is the most common lawful basis for student enrollment data?',
              options: ['Consent', 'Public task', 'Legitimate interests', 'Vital interests'],
              correct: 1
            }
          ]
        },
        {
          title: 'Data Subject Rights Implementation',
          duration: 25,
          content: 'Technical and procedural implementation of GDPR rights including access, rectification, and erasure.',
          quiz: [
            {
              question: 'How long do you have to respond to a subject access request?',
              options: ['30 days', '1 month', '2 months', '90 days'],
              correct: 1
            }
          ]
        },
        {
          title: 'Privacy Impact Assessments',
          duration: 20,
          content: 'Conducting PIAs for educational technology, risk evaluation, and mitigation strategies.',
          quiz: [
            {
              question: 'A DPIA is required when processing is likely to result in:',
              options: ['Any risk', 'High risk', 'Medium risk', 'No risk'],
              correct: 1
            }
          ]
        },
        {
          title: 'International Data Transfers',
          duration: 20,
          content: 'Managing cross-border data flows, adequacy decisions, and standard contractual clauses.',
          quiz: [
            {
              question: 'Which mechanism allows data transfer to non-adequate countries?',
              options: ['Adequacy decisions', 'Standard contractual clauses', 'Both A and B', 'Neither'],
              correct: 1
            }
          ]
        },
        {
          title: 'GDPR Consent Management',
          duration: 20,
          content: 'Designing compliant consent mechanisms, age considerations, and withdrawal procedures.',
          quiz: [
            {
              question: 'Valid consent under GDPR must be:',
              options: ['Freely given', 'Specific and informed', 'Unambiguous', 'All of the above'],
              correct: 3
            }
          ]
        },
        {
          title: 'GDPR Compliance Assessment',
          duration: 10,
          content: 'Comprehensive implementation evaluation, gap analysis, and continuous improvement.',
          quiz: [
            {
              question: 'GDPR compliance requires:',
              options: ['One-time setup', 'Annual review', 'Ongoing monitoring', 'External audit only'],
              correct: 2
            }
          ]
        }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Fundamentals Guide for Education',
      duration: 90,
      level: 'Beginner',
      category: 'Security',
      description: 'Essential cybersecurity guide for educational professionals',
      color: 'bg-red-500',
      icon: <Shield className="w-6 h-6" />,
      tags: ['security', 'general', 'beginner'],
      enrolled: 2100,
      rating: 4.7,
      lessons: [
        {
          title: 'Educational Threat Landscape',
          duration: 15,
          content: 'Understanding cybersecurity risks specific to educational environments and why schools are targets.',
          quiz: [
            {
              question: 'Why are educational institutions attractive targets for cybercriminals?',
              options: ['Valuable student data', 'Often limited security resources', 'Multiple access points', 'All of the above'],
              correct: 3
            }
          ]
        },
        {
          title: 'Password Security and Authentication',
          duration: 15,
          content: 'Building strong authentication practices including password policies and multi-factor authentication.',
          quiz: [
            {
              question: 'What makes a password strong?',
              options: ['Length only', 'Complexity only', 'Length and complexity', 'Using personal information'],
              correct: 2
            }
          ]
        },
        {
          title: 'Email and Communication Security',
          duration: 15,
          content: 'Protecting against phishing attacks, social engineering, and unsafe communication practices.',
          quiz: [
            {
              question: 'What is the best way to verify a suspicious email?',
              options: ['Click the link', 'Reply to sender', 'Contact sender through known method', 'Forward to colleagues'],
              correct: 2
            }
          ]
        },
        {
          title: 'Device and Network Security',
          duration: 20,
          content: 'Securing devices and network connections in educational settings including BYOD considerations.',
          quiz: [
            {
              question: 'When using public Wi-Fi, you should:',
              options: ['Avoid sensitive activities', 'Use a VPN', 'Check for encryption', 'All of the above'],
              correct: 3
            }
          ]
        },
        {
          title: 'Data Protection and Privacy',
          duration: 15,
          content: 'Safeguarding sensitive educational information through proper storage, sharing, and disposal.',
          quiz: [
            {
              question: 'How should sensitive data be disposed of?',
              options: ['Regular deletion', 'Secure deletion/destruction', 'Move to recycle bin', 'Leave for IT'],
              correct: 1
            }
          ]
        },
        {
          title: 'Incident Response and Recovery',
          duration: 10,
          content: 'Responding effectively to cybersecurity incidents and supporting institutional response efforts.',
          quiz: [
            {
              question: 'When you suspect a security incident, you should:',
              options: ['Investigate yourself', 'Ignore if unsure', 'Report immediately', 'Wait and see'],
              correct: 2
            }
          ]
        }
      ]
    },
    {
      id: 'coppa',
      title: 'COPPA Digital Safety Guide for Educators',
      duration: 80,
      level: 'Intermediate',
      category: 'Privacy',
      description: 'Essential COPPA compliance guide for teachers working with students under 13',
      color: 'bg-green-500',
      icon: <Users className="w-6 h-6" />,
      tags: ['privacy', 'COPPA', 'intermediate'],
      enrolled: 890,
      rating: 4.6,
      lessons: [
        {
          title: 'COPPA Fundamentals',
          duration: 20,
          content: 'Understanding COPPA requirements for children under 13, scope, and educational exceptions.',
          quiz: [
            {
              question: 'COPPA applies to children under what age?',
              options: ['12', '13', '14', '16'],
              correct: 1
            }
          ]
        },
        {
          title: 'Educational Technology and COPPA',
          duration: 20,
          content: 'Selecting and implementing age-appropriate digital tools and educational platforms.',
          quiz: [
            {
              question: 'Schools can use educational technology with students under 13 without parental consent if:',
              options: ['Never', 'For educational purposes only', 'With school authorization', 'Both B and C'],
              correct: 3
            }
          ]
        },
        {
          title: 'Parental Consent Management',
          duration: 20,
          content: 'Understanding consent requirements, verification methods, and consent withdrawal.',
          quiz: [
            {
              question: 'Verifiable parental consent can be obtained through:',
              options: ['Email only', 'Phone call', 'Digital signature', 'All methods with verification'],
              correct: 3
            }
          ]
        },
        {
          title: 'Safe Online Learning Environments',
          duration: 20,
          content: 'Creating secure digital learning spaces and managing student interactions online.',
          quiz: [
            {
              question: 'In online learning environments for young children, you should:',
              options: ['Allow open communication', 'Monitor all interactions', 'Disable all features', 'Use moderated platforms'],
              correct: 3
            }
          ]
        }
      ]
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgress = (moduleId) => {
    return userProgress[moduleId] || { completed: 0, total: 0, score: 0 };
  };

  const updateProgress = (moduleId, lessonIndex, score = 0) => {
    setUserProgress(prev => ({
      ...prev,
      [moduleId]: {
        completed: lessonIndex + 1,
        total: trainingModules.find(m => m.id === moduleId)?.lessons.length || 0,
        score: score
      }
    }));
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">EduSoluce™ Training Platform</h1>
            <p className="text-xl text-blue-100 mb-8">Professional Development for Educational Privacy & Security</p>
          <div className="bg-amber-100 dark:bg-amber-900/20 rounded-lg p-4 mb-6 border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-300 text-sm">
              <strong>Legal Notice:</strong> This training platform provides educational resources and tools to assist with privacy compliance but does not guarantee compliance with any specific law or regulation. Educational institutions should consult with qualified legal counsel regarding their specific compliance requirements.
            </p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <Book className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm">Training Modules</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Users className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">4,690</div>
                <div className="text-sm">Students Enrolled</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Award className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">4.7</div>
                <div className="text-sm">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Recommendation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Recommended Learning Path
          </h2>
          <p className="text-gray-600 mb-4">For comprehensive compliance knowledge, we recommend completing modules in this order:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Start with <strong>FERPA Fundamentals</strong> to understand core privacy concepts</li>
            <li>Continue with <strong>COPPA Compliance</strong> if you work with children under 13</li>
            <li>Learn about international regulations with <strong>GDPR for Educational Institutions</strong></li>
            <li>Build security awareness with <strong>Cybersecurity Fundamentals</strong></li>
          </ol>
        </div>

        {/* Training Modules Grid */}
        <h2 className="text-2xl font-bold mb-6">Available Training Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingModules.map((module) => {
            const progress = getProgress(module.id);
            const progressPercentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

            return (
              <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${module.color} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    {module.icon}
                    <span className={`px-2 py-1 rounded text-xs ${getLevelColor(module.level)}`}>
                      {module.level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                  <p className="text-sm opacity-90">{module.description}</p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {module.duration} min
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {module.enrolled.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {module.rating}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {module.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {progress.total > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedModule(module);
                      setCurrentView('module');
                      setCurrentLesson(progress.completed || 0);
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    {progress.completed > 0 ? 'Continue' : 'Start Module'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderModuleView = () => {
    if (!selectedModule) return null;

    const progress = getProgress(selectedModule.id);
    const currentLessonData = selectedModule.lessons[currentLesson];
    const isCompleted = currentLesson >= selectedModule.lessons.length;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </button>
              <div className="text-sm text-gray-600">
                Lesson {currentLesson + 1} of {selectedModule.lessons.length}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Module Header */}
          <div className={`${selectedModule.color} rounded-lg p-6 text-white mb-8`}>
            <div className="flex items-center mb-4">
              {selectedModule.icon}
              <span className="ml-3 text-sm opacity-90">{selectedModule.category}</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{selectedModule.title}</h1>
            <p className="opacity-90">{selectedModule.description}</p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>{Math.round((progress.completed / selectedModule.lessons.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.completed / selectedModule.lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {isCompleted ? (
            /* Completion View */
            <div className="text-center">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
                <p className="text-gray-600 mb-6">
                  You have successfully completed the {selectedModule.title} training module.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    View Certificate
                  </button>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Lesson Content */
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold mb-2">{currentLessonData.title}</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentLessonData.duration} minutes
                </div>
              </div>
              
              <div className="p-6">
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed">{currentLessonData.content}</p>
                </div>

                {/* Quiz Section */}
                {currentLessonData.quiz && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-blue-600" />
                      Knowledge Check
                    </h3>
                    {currentLessonData.quiz.map((q, qIndex) => (
                      <div key={qIndex} className="mb-6">
                        <p className="font-medium mb-3">{q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((option, oIndex) => (
                            <label key={oIndex} className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name={`quiz-${currentLesson}-${qIndex}`}
                                value={oIndex}
                                onChange={(e) => {
                                  setQuizAnswers(prev => ({
                                    ...prev,
                                    [`${currentLesson}-${qIndex}`]: parseInt(e.target.value)
                                  }));
                                }}
                                className="mr-2"
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                    disabled={currentLesson === 0}
                    className="flex items-center px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  
                  <button
                    onClick={() => {
                      updateProgress(selectedModule.id, currentLesson, 85);
                      setCurrentLesson(currentLesson + 1);
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center"
                  >
                    {currentLesson === selectedModule.lessons.length - 1 ? 'Complete Module' : 'Next Lesson'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCertificate = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8 relative">
        <button
          onClick={() => setShowCertificate(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        
        <div className="text-center border-4 border-blue-600 p-8 rounded-lg">
          <div className="text-blue-600 mb-4">
            <Award className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
          <p className="text-gray-600 mb-4">This certifies that</p>
          <p className="text-xl font-bold mb-4">Student Name</p>
          <p className="text-gray-600 mb-2">has successfully completed</p>
          <p className="text-lg font-semibold mb-4">{selectedModule?.title}</p>
          <p className="text-sm text-gray-500 mb-6">EduSoluce™ Educational Compliance Platform</p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'module' && renderModuleView()}
      {showCertificate && renderCertificate()}
    </div>
  );
};

export default EduSoluceTrainingPlatform;