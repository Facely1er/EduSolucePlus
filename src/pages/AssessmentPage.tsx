import React from 'react';
import { AssessmentSection } from '../components/assessments/AssessmentSection';
import { AboutAssessmentsSection } from '../components/assessments/AboutAssessmentsSection';
import { AnonymousBrowsingNotice } from '../components/auth/AnonymousBrowsingNotice';

export function AssessmentPage() {
  return (
    <div className="container py-8">
      <AnonymousBrowsingNotice />
      <AssessmentSection />
      <AboutAssessmentsSection />
    </div>
  );
}