import React from 'react';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Superintendent',
      organization: 'Metro School District',
      content: 'EduSoluce™ has transformed how we approach privacy compliance. The role-specific guidance makes it easy for our staff to understand their responsibilities.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'IT Director',
      organization: 'Valley High School',
      content: 'The technical assessments and vendor evaluation tools have been invaluable. We can now confidently assess EdTech tools for compliance.',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Teacher',
      organization: 'Elementary School',
      content: 'The classroom privacy best practices and parent communication templates have made it so much easier to protect student data in my classroom.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Educational Leaders
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how EduSoluce™ is helping educational institutions across the country 
            simplify privacy compliance and protect student data.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-2" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}, {testimonial.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}