import React, { useState, useEffect } from 'react';

interface TextCarouselProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function TextCarousel({ texts, interval = 5000, className = '' }: TextCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (texts.length <= 1) return;
    
    const timer = setInterval(() => {
      setIsAnimating(true);
      
      // After the fade-out animation, change the text
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsAnimating(false);
      }, 500); // Half a second for the fade out
    }, interval);
    
    return () => clearInterval(timer);
  }, [texts, interval]);
  
  if (!texts.length) return null;
  if (texts.length === 1) return <p className={className}>{texts[0]}</p>;
  
  return (
    <div className="relative">
      <p 
        className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'} ${className}`}
      >
        {texts[currentIndex]}
      </p>
    </div>
  );
}