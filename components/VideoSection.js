import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import VideoPlayer from './VideoPlayer';

const VideoSection = ({ videos, className = "" }) => {
  // Track failed images to handle fallbacks
  const [failedImages, setFailedImages] = useState({});
  const [activeVideoId, setActiveVideoId] = useState(null);
  
  if (!videos || videos.length === 0) {
    return null;
  }

  const handleImageError = (id) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
    console.error(`Failed to load video thumbnail for ID: ${id}`);
  };

  const handleVideoClick = (id) => {
    setActiveVideoId(id === activeVideoId ? null : id);
  };

  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Only show the heading if not provided via className (for custom styling) */}
        {!className.includes("no-heading") && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured <span className="gradient-text">Videos</span>
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <motion.div 
              key={video.id} 
              className={`${className.includes("dark") ? "bg-black bg-opacity-60" : "bg-white"} rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-w-16 aspect-h-9">
                {activeVideoId === video.id ? (
                  <div className="w-full h-full">
                    <VideoPlayer 
                      src={`https://www.dailymotion.com/embed/video/${video.videoId || video.id}`}
                      poster={video.thumbnail}
                      alt={video.title}
                    />
                  </div>
                ) : (
                  <div 
                    className="cursor-pointer w-full h-full"
                    onClick={() => handleVideoClick(video.id)}
                  >
                    <div className="relative w-full h-full">
                      {!failedImages[video.id] ? (
                        <Image 
                          src={video.thumbnail} 
                          alt={video.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover"
                          loading="lazy"
                          quality={75}
                          onError={() => handleImageError(video.id)}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                          <span className="text-gray-500">Video Preview</span>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center section-bg-dark hover:bg-opacity-30 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 flex-grow">
                <h3 className={`font-bold text-lg mb-1 ${className.includes("dark") ? "text-white" : "text-gray-800"}`}>{video.title}</h3>
                {video.category && (
                  <p className={`text-sm ${className.includes("dark") ? "text-gray-300" : "text-gray-500"} uppercase`}>{video.category}</p>
                )}
                {video.description && !video.category && (
                  <p className={`text-sm ${className.includes("dark") ? "text-gray-300" : "text-gray-500"}`}>
                    {video.description.substring(0, 100)}{video.description.length > 100 ? '...' : ''}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(VideoSection); 