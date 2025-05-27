import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { usePersonalizedContent } from '@/hooks/usePersonalizedContent';

const DynamicTestimonials = () => {
  const { content, loading } = usePersonalizedContent();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (!loading && content.socialProof.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => 
          prev === content.socialProof.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loading, content.socialProof]);

  if (loading) {
    return (
      <div className="animate-pulse bg-white/10 rounded-xl p-6 h-48"></div>
    );
  }

  const testimonial = content.socialProof[currentTestimonial];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <Quote className="h-8 w-8 text-agency-bright-blue mb-4" />
      <p className="text-white text-lg mb-4">{testimonial.text}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">{testimonial.author}</p>
          <p className="text-gray-300 text-sm">{testimonial.role}</p>
        </div>
        <div className="flex gap-1">
          {content.socialProof.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentTestimonial === index
                  ? 'bg-agency-bright-blue'
                  : 'bg-white/30'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicTestimonials; 