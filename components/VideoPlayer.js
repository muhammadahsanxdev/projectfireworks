import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function VideoPlayer({ 
  src = "/videos/fireworksworking-1.mp4", 
  poster = "/images/video-poster.jpg",
  alt = "Fireworks display video" 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // Check if the source is from Dailymotion
  const isDailymotion = typeof src === 'string' && src.includes('dailymotion.com');

  // Handle video play with error handling
  const handlePlayClick = () => {
    if (isDailymotion) {
      setIsPlaying(true);
      setIsLoading(false);
      return;
    }
    
    if (!videoRef.current) return;
    
    setIsLoading(true);
    
    videoRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Video playback failed:", error);
        setError("Video playback failed. Please try again.");
        setIsLoading(false);
      });
  };

  // Implement Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      }, 
      { 
        root: null,
        rootMargin: '100px', // Load when 100px from viewport
        threshold: 0.1 
      }
    );
    
    const currentRef = containerRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Handle video loading events
  useEffect(() => {
    if (isDailymotion || !videoRef.current || !isVisible) return;
    
    const handleLoadedData = () => {
      setIsLoading(false);
    };
    
    const handleError = (e) => {
      console.error("Video loading error:", e);
      setError("Failed to load video. Please try again later.");
      setIsLoading(false);
    };
    
    const video = videoRef.current;
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    
    // Set preload attribute only when visible
    if (isVisible) {
      video.preload = 'metadata';
    }
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [isVisible, isDailymotion]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
      style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.12)' }}
    >
      <div className="relative h-full w-full" aria-live="polite">
        {isDailymotion ? (
          <iframe
            src={`${src}?ui-start-screen-info=false&ui-highlight=FD7601`}
            title={alt}
            style={{ border: 0 }}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        ) : (
          <>
            {isVisible && (
              <video 
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={src}
                poster={poster}
                playsInline
                controls={isPlaying}
                loop
                muted
                aria-label={alt}
              />
            )}
            
            {!isVisible && (
              <div className="absolute inset-0 bg-gray-900">
                <Image
                  src={poster}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover"
                />
              </div>
            )}
            
            {isVisible && !isPlaying && !error && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 cursor-pointer"
                onClick={handlePlayClick}
              >
                {isLoading ? (
                  <div className="w-16 h-16 rounded-full bg-red-600 bg-opacity-80 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-red-600 bg-opacity-80 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white mt-4 text-sm font-medium">Click to play</p>
                  </>
                )}
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white text-center">{error}</p>
                <button 
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => {
                    setError(null);
                    setIsLoading(true);
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                  }}
                >
                  Retry
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {!isDailymotion && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <p className="text-white text-center text-sm">Experience the magic of our fireworks displays</p>
        </div>
      )}
    </motion.div>
  );
} 