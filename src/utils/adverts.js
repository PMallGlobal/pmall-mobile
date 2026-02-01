import React, { useState, useEffect } from "react";

const AdvertCarousel = ({ adverts, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate ads
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % adverts.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [adverts, interval]);

  if (!adverts || adverts.length === 0) return null; // Handle empty array

  return (
    <div className="advert-carousel">
      {adverts.map((ad, index) => (
        <div
          key={ad.id}
          className={`advert-slide ${index === currentIndex ? "active" : ""}`}
        >
          <a href={ad.url || "#"} target="_blank" rel="noopener noreferrer">
            <img
              src={ad.image_path}
              alt={`Advert ${ad.id}`}
              className={`advert-img ${ad.size === "large" ? "large" : "small"}`}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default AdvertCarousel;
