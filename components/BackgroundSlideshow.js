import { useState, useEffect } from 'react';
import Image from 'next/image';

const BackgroundSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/images/fireworks-1.jpg',
    '/images/fireworks-2.jpeg',
    '/images/fireworks-3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/80 z-10"></div>
      
      {/* Images */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}
    </div>
  );
};

export default BackgroundSlideshow; 