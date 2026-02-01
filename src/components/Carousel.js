import React, { useState, useEffect } from 'react';


// Replace these with your actual image paths or URLs
const slides = [
  {
    id: 1,
    image: '/images/banner.png',
  },
  {
    id: 2,
    image: '/images/banner.png',
  },
  {
    id: 3,
    image: '/images/banner.png',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play: change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <img src={slide.image} alt={slide.title} />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;