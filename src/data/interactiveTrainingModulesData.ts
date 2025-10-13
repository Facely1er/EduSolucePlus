// Interactive training modules data separated for better Fast Refresh support
export interface InteractiveModule {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  scenarios: InteractiveScenario[];
  assessments: ModuleAssessment[];
}

export interface InteractiveScenario {
  id: string;
  title: string;
  context: string;
  challenge: string;
  options: ScenarioOption[];
  correctOptionId: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
  learningPoints: string[];
}

export interface ScenarioOption {
  id: string;
  text: string;
  consequence: string;
  isCorrect: boolean;
}

export interface ModuleAssessment {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const interactiveModules: Record<string, InteractiveModule> = {
  'advanced-ferpa-compliance': {
    id: 'advanced-ferpa-compliance',
    title: 'Advanced FERPA Compliance for Administrators',
    description: 'Master complex FERPA situations and decision-making',
    estimatedTime: 45,
    difficulty: 'advanced',
    scenarios: [
      {
        id: 'scenario-1',
        title: 'Emergency Disclosure Dilemma',
        context: 'A student has made concerning statements about self-harm. The school counselor believes there is an imminent risk to the student\'s safety.',
        challenge: 'A parent of another student is demanding to know if their child is safe and wants details about the concerning student. How do you respond?',
        options: [
          {
            id: 'option-1',
            text: 'Disclose the student\'s identity and situation details to reassure the parent',
            consequence: 'Violates FERPA - unnecessary disclosure of personally identifiable information',
            isCorrect: false
          },
          {
            id: 'option-2',
            text: 'Refuse to disclose any information and refer the parent to general school safety procedures',
            consequence: 'Appropriate response - protects student privacy while addressing concerns',
            isCorrect: true
          },
          {
            id: 'option-3',
            text: 'Confirm there was an incident but don\'t identify the specific student',
            consequence: 'Still problematic - may indirectly identify the student',
            isCorrect: false
          },
          {
            id: 'option-4',
            text: 'Ask the parent to submit a formal FERPA request for information',
            consequence: 'Inappropriate - formal requests don\'t apply to emergency situations',
            isCorrect: false
          }
        ],
        correctOptionId: 'option-2',
        feedback: {
          correct: 'Good response! This approach protects the student\'s privacy while appropriately addressing the parent\'s safety concerns. FERPA allows disclosure for emergencies, but only to appropriate parties (like emergency responders), not to other parents.',
          incorrect: 'This approach could violate FERPA. Remember that emergency disclosures must be limited to appropriate parties and necessary information only.'
        },
        learningPoints: [
          'Emergency disclosures must be limited to appropriate parties',
          'Other parents are not typically appropriate recipients of emergency information',
          'Always consider the minimum necessary information principle',
          'Document all emergency disclosure decisions and rationale'
        ]
      },
      {
        id: 'scenario-2',
        title: 'Vendor Data Breach Response',
        context: 'Your institution\'s learning management system vendor has experienced a data breach affecting student grades and personal information.',
        challenge: 'Parents are calling demanding to know what happened and what data was exposed. What is your immediate response strategy?',
        options: [
          {
            id: 'option-1',
            text: 'Wait for the vendor to provide all details before communicating anything',
            consequence: 'Delays may increase liability and reduce trust',
            isCorrect: false
          },
          {
            id: 'option-2',
            text: 'Immediately notify all parents with available information and ongoing investigation details',
            consequence: 'Appropriate transparency while maintaining ongoing investigation',
            isCorrect: true
          },
          {
            id: 'option-3',
            text: 'Only notify parents if you determine their child\'s data was specifically compromised',
            consequence: 'May not meet FERPA\'s broad notification expectations',
            isCorrect: false
          },
          {
            id: 'option-4',
            text: 'Refer all inquiries to the vendor since it was their breach',
            consequence: 'Inappropriate - the school has direct responsibility to families',
            isCorrect: false
          }
        ],
        correctOptionId: 'option-2',
        feedback: {
          correct: 'Correct! Transparent communication builds trust and meets FERPA expectations. You should notify families promptly while continuing to gather information.',
          incorrect: 'This approach may not meet your obligations to families or could damage trust. Prompt, transparent communication is generally recommended.'
        },
        learningPoints: [
          'Schools have direct obligations to families even in vendor breaches',
          'Prompt communication builds trust and demonstrates responsibility',
          'Continue gathering information while maintaining transparency',
          'Document all breach response decisions and communications'
        ]
      }
    ],
    assessments: [
      {
        id: 'assessment-1',
        question: 'Under FERPA, which of the following requires written consent before disclosure?',
        options: [
          'Directory information for students who have not opted out',
          'Information disclosed to school officials with legitimate educational interest',
          'Student grades shared with parents during parent-teacher conferences',
          'Educational records disclosed to another school where the student seeks to enroll'
        ],
        correctAnswer: 2,
        explanation: 'Student grades are education records that generally require written consent before disclosure, even to parents (unless they meet other exceptions).',
        difficulty: 'medium'
      },
      {
        id: 'assessment-2',
        question: 'What is the maximum time frame for providing access to education records under FERPA?',
        options: [
          '30 days',
          '45 days',
          '60 days',
          '90 days'
        ],
        correctAnswer: 1,
        explanation: 'FERPA requires educational institutions to provide access to education records within 45 days of receiving a request.',
        difficulty: 'easy'
      },
      {
        id: 'assessment-3',
        question: 'In a FERPA emergency disclosure situation, which factor is MOST important in determining appropriateness?',
        options: [
          'The severity of the emergency situation',
          'Whether parents have been notified first',
          'The relationship between the disclosing party and the student',
          'Whether the information is necessary to address the emergency'
        ],
        correctAnswer: 3,
        explanation: 'The necessity of the information to address the emergency is the most important factor. Even in emergencies, only the minimum necessary information should be disclosed.',
        difficulty: 'hard'
      }
    ]
  }
};