import React from 'react';

export function AboutAssessmentsSection() {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">About Our Assessments</h2>
        
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Our role-specific assessments are designed to evaluate your institution's compliance with key 
            educational privacy regulations including FERPA, COPPA, GDPR, and more.
          </p>
          
          <p>
            Each assessment provides immediate feedback with explanations and resources to improve your 
            knowledge and institutional practices.
          </p>
          
          <p>
            Upon completion, you'll receive a detailed report and certificate that can be shared with 
            your administration or included in professional development records.
          </p>
        </div>
      </div>
    </section>
  );
}