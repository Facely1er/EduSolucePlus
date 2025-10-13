// Assessment Questions Data for all roles
// Actual questions for each assessment area

export interface AssessmentQuestion {
  id: string;
  areaId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export const assessmentQuestions: Record<string, AssessmentQuestion[]> = {
  // Administrator Assessment Questions
  'education-records-management': [
    {
      id: 'erm-q1',
      areaId: 'education-records-management',
      question: 'Which of the following is NOT considered an education record under FERPA?',
      options: [
        'Student transcript with grades',
        'Teacher\'s personal notes kept in desk drawer',
        'Disciplinary action reports',
        'Special education assessment results'
      ],
      correctAnswer: 1,
      explanation: 'Teacher\'s personal notes that are kept in the sole possession of the teacher and not shared with others are excluded from the definition of education records.',
      difficulty: 'medium',
      points: 10
    },
    {
      id: 'erm-q2',
      areaId: 'education-records-management',
      question: 'How long does an institution have to respond to a request to inspect education records?',
      options: [
        '30 days',
        '45 days',
        '60 days',
        '90 days'
      ],
      correctAnswer: 1,
      explanation: 'FERPA requires institutions to provide access to education records within 45 days of receiving a request.',
      difficulty: 'easy',
      points: 5
    },
    {
      id: 'erm-q3',
      areaId: 'education-records-management',
      question: 'What is required before disclosing non-directory education records?',
      options: [
        'Principal approval',
        'Written consent from parent/eligible student',
        'Board of education approval',
        'State department notification'
      ],
      correctAnswer: 1,
      explanation: 'FERPA generally requires written consent from the parent (or eligible student) before disclosing non-directory education records.',
      difficulty: 'medium',
      points: 10
    }
  ],

  'directory-information-policies': [
    {
      id: 'dip-q1',
      areaId: 'directory-information-policies',
      question: 'Directory information can be disclosed without consent if:',
      options: [
        'The student has not opted out of directory information disclosure',
        'The parent specifically requests it',
        'The school administration approves it',
        'The information is needed for educational purposes'
      ],
      correctAnswer: 0,
      explanation: 'Directory information can be disclosed without consent as long as the student/parent has not opted out of such disclosures.',
      difficulty: 'medium',
      points: 10
    },
    {
      id: 'dip-q2',
      areaId: 'directory-information-policies',
      question: 'When must schools provide annual notification of FERPA rights?',
      options: [
        'Before or at the start of each school year',
        'Only when students enroll',
        'When parents request it',
        'Every semester'
      ],
      correctAnswer: 0,
      explanation: 'Schools must provide annual notification of FERPA rights before or at the start of each school year.',
      difficulty: 'easy',
      points: 5
    }
  ],

  // Teacher Assessment Questions
  'education-records-understanding': [
    {
      id: 'eru-q1',
      areaId: 'education-records-understanding',
      question: 'Which of these would be considered an education record in your classroom?',
      options: [
        'Your personal observations about a student kept in your grade book',
        'Informal notes you wrote about student behavior for your own reference',
        'A reminder note you wrote to call a parent',
        'Your personal teaching reflections about classroom management'
      ],
      correctAnswer: 0,
      explanation: 'Personal observations recorded in official grade books or shared with others are education records, unlike sole possession notes kept privately.',
      difficulty: 'medium',
      points: 10
    },
    {
      id: 'eru-q2',
      areaId: 'education-records-understanding',
      question: 'Can you share a student\'s grade with their parent during a parent-teacher conference?',
      options: [
        'No, this requires written consent',
        'Yes, this falls under legitimate educational interest',
        'Only if the student is under 18',
        'Only with principal approval'
      ],
      correctAnswer: 1,
      explanation: 'Sharing grades with parents during conferences falls under legitimate educational interest exception.',
      difficulty: 'easy',
      points: 5
    }
  ],

  'parent-communication-compliance': [
    {
      id: 'pcc-q1',
      areaId: 'parent-communication-compliance',
      question: 'Before sharing student information with a non-custodial parent, you should:',
      options: [
        'Always get permission from the custodial parent first',
        'Check if there are any court orders restricting access',
        'Require the non-custodial parent to provide legal documentation',
        'Refuse to share any information'
      ],
      correctAnswer: 1,
      explanation: 'You should check for any court orders or legal restrictions before sharing information with non-custodial parents.',
      difficulty: 'hard',
      points: 15
    }
  ],

  // IT Staff Assessment Questions
  'network-security-architecture': [
    {
      id: 'nsa-q1',
      areaId: 'network-security-architecture',
      question: 'What is the most important security principle for protecting student data on the network?',
      options: [
        'Strong passwords only',
        'Network segmentation and access controls',
        'Antivirus software installation',
        'Regular software updates'
      ],
      correctAnswer: 1,
      explanation: 'Network segmentation and proper access controls are fundamental for protecting sensitive student data from unauthorized access.',
      difficulty: 'medium',
      points: 10
    },
    {
      id: 'nsa-q2',
      areaId: 'network-security-architecture',
      question: 'Which encryption standard should be used for protecting student data in transit?',
      options: [
        'WEP encryption',
        'TLS 1.2 or higher',
        'Basic password protection',
        'No encryption needed for internal networks'
      ],
      correctAnswer: 1,
      explanation: 'TLS 1.2 or higher provides strong encryption for data in transit and is required for protecting sensitive educational data.',
      difficulty: 'hard',
      points: 15
    }
  ],

  // Student Assessment Questions
  'understanding-education-records': [
    {
      id: 'uer-q1',
      areaId: 'understanding-education-records',
      question: 'Which of these is considered your education record?',
      options: [
        'Your report card and transcript',
        'Your teacher\'s personal notes about you',
        'Campus security reports',
        'Your employment records from a school job'
      ],
      correctAnswer: 0,
      explanation: 'Report cards and transcripts contain your educational information and are part of your official education records.',
      difficulty: 'easy',
      points: 5
    },
    {
      id: 'uer-q2',
      areaId: 'understanding-education-records',
      question: 'At what age do your FERPA rights transfer from your parents to you?',
      options: [
        '16 years old',
        '17 years old',
        '18 years old or when you attend college',
        '21 years old'
      ],
      correctAnswer: 2,
      explanation: 'FERPA rights transfer from parents to students when the student turns 18 or attends a postsecondary institution.',
      difficulty: 'easy',
      points: 5
    }
  ],

  'personal-information-protection': [
    {
      id: 'pip-q1',
      areaId: 'personal-information-protection',
      question: 'Which of these is the best way to protect your personal information online?',
      options: [
        'Share it only with friends',
        'Use privacy settings and limit sharing',
        'Post it only on trusted websites',
        'Share it only during school hours'
      ],
      correctAnswer: 1,
      explanation: 'Using privacy settings and limiting what you share online is an effective way to protect your personal information.',
      difficulty: 'easy',
      points: 5
    }
  ]
};

// Get questions for a specific assessment area
export const getQuestionsForArea = (areaId: string): AssessmentQuestion[] => {
  return assessmentQuestions[areaId] || [];
};

// Get all questions for an assessment
export const getQuestionsForAssessment = (assessmentId: string, areas: string[]): AssessmentQuestion[] => {
  const questions: AssessmentQuestion[] = [];
  areas.forEach(areaId => {
    questions.push(...(assessmentQuestions[areaId] || []));
  });
  return questions;
};
// Calculate score based on responses
export const calculateAssessmentScore = (
  responses: Record<string, number>,
  questions: AssessmentQuestion[]
): { score: number; totalPoints: number; correctAnswers: number } => {
  let totalPoints = 0;
  let earnedPoints = 0;
  let correctAnswers = 0;

  questions.forEach(question => {
    totalPoints += question.points;
    const userAnswer = responses[question.id];
    
    if (userAnswer === question.correctAnswer) {
      earnedPoints += question.points;
      correctAnswers++;
    }
  });

  const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  
  return { score, totalPoints, correctAnswers };
};