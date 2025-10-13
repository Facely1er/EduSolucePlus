import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, X, Eye, EyeOff, Lock, Mail, Monitor, Award, Target, Clock } from 'lucide-react';

const CybersecuritySimulator = () => {
  const [currentSimulation, setCurrentSimulation] = useState('dashboard');
  const [completedModules, setCompletedModules] = useState(new Set());
  const [currentPhishingEmail, setCurrentPhishingEmail] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes for scenarios

  const simulations = {
    phishing: {
      title: 'Phishing Email Detection',
      description: 'Identify suspicious emails and learn to protect against phishing attacks',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-red-500',
      emails: [
        {
          id: 1,
          from: 'security@youschool.edu',
          subject: 'URGENT: Verify Your Account Immediately',
          body: 'Your account will be suspended in 24 hours. Click here to verify: http://youschool-verify.suspicious-domain.com',
          isPhishing: true,
          indicators: ['Urgent language', 'Suspicious domain', 'Threatens account suspension', 'Requests immediate action'],
          explanation: 'This is a phishing email. Real security notifications from your school would come from official domains and wouldn\'t use urgent threats.'
        },
        {
          id: 2,
          from: 'principal@springfieldelementary.edu',
          subject: 'Staff Meeting Tomorrow',
          body: 'Reminder: Staff meeting tomorrow at 3:30 PM in the main conference room. Please bring your lesson plans for review.',
          isPhishing: false,
          indicators: ['Official domain', 'Normal business communication', 'No suspicious links', 'Appropriate sender'],
          explanation: 'This is a legitimate email from your principal using the official school domain with normal business communication.'
        },
        {
          id: 3,
          from: 'noreply@microsoft-security.com',
          subject: 'Your Microsoft Office License Expires Today',
          body: 'Your Office 365 license expires today. Renew now to avoid service interruption: https://office-renewal.microsoft-security.com/renew',
          isPhishing: true,
          indicators: ['Fake Microsoft domain', 'Creates urgency', 'Suspicious subdomain', 'License expiration threat'],
          explanation: 'This is phishing. Microsoft would not use "microsoft-security.com" domain. Real notifications come from @microsoft.com.'
        }
      ]
    },
    passwords: {
      title: 'Password Security Lab',
      description: 'Create strong passwords and understand security best practices',
      icon: <Lock className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    incident: {
      title: 'Incident Response Simulator',
      description: 'Practice responding to cybersecurity incidents in a school environment',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-orange-500',
      scenarios: [
        {
          id: 1,
          title: 'Suspicious Email Received',
          description: 'A teacher reports receiving a suspicious email asking for student information.',
          severity: 'Medium',
          steps: [
            {
              question: 'What is your first action?',
              options: [
                'Forward the email to IT immediately',
                'Tell the teacher to ignore it',
                'Isolate the teacher\'s computer and report to IT',
                'Reply to the email to gather more information'
              ],
              correct: 2,
              explanation: 'Isolating the computer prevents potential malware spread, and reporting ensures proper investigation.'
            },
            {
              question: 'Who should be notified about this incident?',
              options: [
                'Only the IT department',
                'IT, administration, and potentially parents',
                'Just the teacher who received it',
                'Post a warning on social media'
              ],
              correct: 1,
              explanation: 'Proper incident response involves IT for technical response, administration for decision-making, and potentially parents if student data is at risk.'
            }
          ]
        },
        {
          id: 2,
          title: 'Ransomware Attack',
          description: 'The school\'s file server displays a ransomware message demanding payment.',
          severity: 'High',
          steps: [
            {
              question: 'Immediate priority action?',
              options: [
                'Pay the ransom immediately',
                'Disconnect affected systems from network',
                'Try to remove the ransomware yourself',
                'Restart all computers'
              ],
              correct: 1,
              explanation: 'Disconnecting systems prevents spread. Never pay ransoms, and don\'t attempt removal without expertise.'
            },
            {
              question: 'Communication strategy?',
              options: [
                'Keep the incident secret',
                'Immediately post on social media',
                'Notify law enforcement and stakeholders',
                'Only tell a few key people'
              ],
              correct: 2,
              explanation: 'Ransomware attacks often require law enforcement reporting and transparent communication with stakeholders.'
            }
          ]
        }
      ]
    },
    devices: {
      title: 'Device Security Challenge',
      description: 'Secure various devices and networks in educational settings',
      icon: <Monitor className="w-6 h-6" />,
      color: 'bg-green-500',
    }
  };

  useEffect(() => {
    if (currentSimulation !== 'dashboard' && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, currentSimulation]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 12) {
      score += 2;
    } else if (password.length >= 8) {
      score += 1;
      feedback.push('Consider using 12+ characters for better security');
    } else {
      feedback.push('Password too short - use at least 8 characters');
    }

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Add numbers');

    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    else feedback.push('Add special characters (!@#$%^&*)');

    if (!/(.)\1{2,}/.test(password)) score += 1;
    else feedback.push('Avoid repeating characters');

    const commonPasswords = ['password', '123456', 'admin', 'welcome', 'school'];
    if (!commonPasswords.some(common => password.toLowerCase().includes(common))) {
      score += 1;
    } else {
      feedback.push('Avoid common words');
    }

    return { score: Math.min(score, 8), feedback };
  };

  const handlePasswordChange = (password) => {
    setCurrentPassword(password);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getPasswordStrengthColor = (score) => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 4) return 'bg-yellow-500';
    if (score <= 6) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (score) => {
    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Fair';
    if (score <= 6) return 'Good';
    return 'Strong';
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Cybersecurity Training Simulator</h1>
              <p className="text-red-100">Interactive security awareness training for educational professionals</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">Start</div>
              <div className="text-red-100 text-sm">Training</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-lg p-4">
              <Shield className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">{completedModules.size}/4</div>
              <div className="text-sm text-red-100">Modules Completed</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Target className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">Learn</div>
              <div className="text-sm text-red-100">Threat Detection</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Award className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">Pro</div>
              <div className="text-sm text-red-100">Quality Training</div>
            </div>
          </div>
        </div>

        {/* Simulation Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(simulations).map(([key, simulation]) => (
            <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${simulation.color} p-6 text-white`}>
                <div className="flex items-center mb-4">
                  {simulation.icon}
                  <h3 className="text-xl font-bold ml-3">{simulation.title}</h3>
                </div>
                <p className="text-sm opacity-90">{simulation.description}</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    15-20 minutes
                  </div>
                  {completedModules.has(key) && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                
                <button
                  onClick={() => setCurrentSimulation(key)}
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                >
                  {completedModules.has(key) ? 'Practice Again' : 'Start Simulation'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Completed Modules</h3>
              <div className="space-y-2">
                {Object.entries(simulations).map(([key, simulation]) => (
                  <div key={key} className="flex items-center">
                    <CheckCircle className={`w-4 h-4 mr-2 ${completedModules.has(key) ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={completedModules.has(key) ? 'text-green-700' : 'text-gray-500'}>
                      {simulation.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Skill Development</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm mb-1">
                    <span>Phishing Detection</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm mb-1">
                    <span>Password Security</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm mb-1">
                    <span>Incident Response</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhishingSimulation = () => {
    const email = simulations.phishing.emails[currentPhishingEmail];
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-red-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold">Phishing Email Detection</h1>
                  <p className="text-gray-600">Analyze the email below and determine if it's legitimate or suspicious</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Email {currentPhishingEmail + 1} of {simulations.phishing.emails.length}</div>
                <div className="text-lg font-bold text-red-600">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</div>
              </div>
            </div>
          </div>

          {/* Email Interface */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Email Analysis</h2>
                <div className="flex space-x-2">
                  <button className="text-sm bg-gray-200 px-3 py-1 rounded">Reply</button>
                  <button className="text-sm bg-gray-200 px-3 py-1 rounded">Forward</button>
                  <button className="text-sm bg-red-200 text-red-800 px-3 py-1 rounded">Report Phishing</button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="border rounded-lg p-4 mb-6">
                <div className="mb-4">
                  <div className="text-sm text-gray-500">From:</div>
                  <div className="font-medium">{email.from}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Subject:</div>
                  <div className="font-medium">{email.subject}</div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-500 mb-2">Message:</div>
                  <div className="text-gray-800">{email.body}</div>
                </div>
              </div>

              {/* Analysis Question */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Is this email legitimate or phishing?</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="email-analysis" value="legitimate" className="mr-3" />
                    <span>This appears to be a legitimate email</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="email-analysis" value="phishing" className="mr-3" />
                    <span>This appears to be a phishing email</span>
                  </label>
                </div>
                
                <button
                  onClick={() => {
                    // Show results logic would go here
                    setCurrentPhishingEmail((prev) => (prev + 1) % simulations.phishing.emails.length);
                  }}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Analyze Email
                </button>
              </div>

              {/* Educational Content */}
              <div className="mt-6 bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Security Indicators to Look For:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">Red Flags:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Urgent or threatening language</li>
                      <li>• Suspicious sender domains</li>
                      <li>• Requests for sensitive information</li>
                      <li>• Suspicious links or attachments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Good Signs:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Official institutional domains</li>
                      <li>• Normal business communication</li>
                      <li>• No urgent threats or demands</li>
                      <li>• Appropriate sender for content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentSimulation('dashboard')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => {
                setCompletedModules(prev => new Set([...prev, 'phishing']));
                setCurrentSimulation('dashboard');
              }}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Complete Module
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPasswordSimulation = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <Lock className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Password Security Lab</h1>
              <p className="text-gray-600">Create and test secure passwords</p>
            </div>
          </div>
        </div>

        {/* Password Tester */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Password Strength Tester</h2>
          
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter a password to test..."
              value={currentPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full p-3 border rounded-lg pr-10"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {currentPassword && (
            <div className="space-y-4">
              {/* Strength Meter */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Password Strength</span>
                  <span className={`text-sm font-medium ${passwordStrength.score <= 2 ? 'text-red-600' : passwordStrength.score <= 4 ? 'text-yellow-600' : passwordStrength.score <= 6 ? 'text-blue-600' : 'text-green-600'}`}>
                    {getPasswordStrengthText(passwordStrength.score)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                    style={{ width: `${(passwordStrength.score / 8) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Feedback */}
              {passwordStrength.feedback.length > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Suggestions for improvement:</h3>
                  <ul className="text-sm space-y-1">
                    {passwordStrength.feedback.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Password Best Practices */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Password Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-600">Do:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Use 12+ characters</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Mix letters, numbers, symbols</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Use unique passwords</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Use a password manager</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Enable 2FA when available</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-red-600">Don't:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" />Use personal information</li>
                <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" />Reuse passwords</li>
                <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" />Use dictionary words</li>
                <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" />Share passwords</li>
                <li className="flex items-center"><X className="w-4 h-4 text-red-500 mr-2" />Write passwords down visibly</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentSimulation('dashboard')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => {
              setCompletedModules(prev => new Set([...prev, 'passwords']));
              setCurrentSimulation('dashboard');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Complete Module
          </button>
        </div>
      </div>
    </div>
  );

  const renderIncidentSimulation = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Incident Response Simulator</h1>
              <p className="text-gray-600">Practice your response to cybersecurity incidents</p>
            </div>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          {simulations.incident.scenarios.map((scenario) => (
            <div key={scenario.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">{scenario.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  scenario.severity === 'High' ? 'bg-red-100 text-red-800' : 
                  scenario.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {scenario.severity} Risk
                </span>
              </div>
              <p className="text-gray-600 mb-4">{scenario.description}</p>
              <button className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700">
                Start Scenario
              </button>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentSimulation('dashboard')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  // Main render logic
  switch (currentSimulation) {
    case 'phishing':
      return renderPhishingSimulation();
    case 'passwords':
      return renderPasswordSimulation();
    case 'incident':
      return renderIncidentSimulation();
    case 'devices':
      return <div className="p-8 text-center">Device Security module coming soon!</div>;
    default:
      return renderDashboard();
  }
};

export default CybersecuritySimulator;