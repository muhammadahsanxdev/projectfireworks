import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import VideoPlayer from '../components/VideoPlayer';

export default function Videos() {
  // Section style for better text readability
  const sectionStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '0.5rem',
    padding: '2rem',
    backdropFilter: 'blur(5px)'
  };

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);
  
  // Pagination
  const videosPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch videos from Dailymotion
  useEffect(() => {
    const fetchDailymotionVideos = async () => {
      try {
        setLoading(true);
        let allVideos = [];
        let page = 1;
        let hasMoreVideos = true;
        const limit = 100; // Maximum allowed by Dailymotion API
        
        // Fetch all pages of videos
        while (hasMoreVideos) {
          // Fetch videos from anum-akram channel with pagination
          const response = await fetch(
            `https://api.dailymotion.com/user/anum-akram/videos?fields=id,title,description,thumbnail_url,channel&limit=${limit}&page=${page}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch videos');
          }
          
          const data = await response.json();
          
          // If no videos returned or we've reached the end, stop fetching
          if (!data.list || data.list.length === 0) {
            hasMoreVideos = false;
          } else {
            // Transform the data to match our application structure
            const transformedVideos = data.list.map((video) => ({
              id: video.id,
              title: video.title,
              description: video.description || "Spectacular fireworks display by Pakistan Super Fireworks",
              videoId: video.id,
              thumbnail: video.thumbnail_url
            }));
            
            // Add videos to our collection
            allVideos = [...allVideos, ...transformedVideos];
            
            // Check if we've reached the last page
            if (!data.has_more) {
              hasMoreVideos = false;
            } else {
              page++;
            }
          }
        }
        
        setVideos(allVideos);
        console.log(`Loaded ${allVideos.length} videos in total`);
      } catch (error) {
        console.error("Error fetching Dailymotion videos:", error);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDailymotionVideos();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Handle video thumbnail click
  const handleVideoClick = (videoId) => {
    setActiveVideoId(videoId === activeVideoId ? null : videoId);
  };

  // Pagination navigation
  const goToPage = (pageNumber) => {
    setActiveVideoId(null);
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout title="Fireworks Videos | Pakistan Super Fireworks">      
      {/* Main Content */}
      <div className="relative z-10 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Fireworks <span className="gradient-text">Videos</span></h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Watch some of our most spectacular fireworks displays in action.
                These videos showcase our work at various events across Pakistan.
              </p>
            </div>
            
            {loading && (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {error && (
              <div className="text-center py-8">
                <p className="text-red-400 text-lg">{error}</p>
              </div>
            )}
            
            {/* Videos Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {currentVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="section-bg-dark rounded-lg overflow-hidden h-full flex flex-col"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      {activeVideoId === video.id ? (
                        <div className="w-full h-full">
                          <VideoPlayer 
                            src={`https://www.dailymotion.com/embed/video/${video.videoId}`} 
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
                            <Image 
                              src={video.thumbnail} 
                              alt={video.title}
                              fill
                              className="object-cover"
                              unoptimized={true} // Since the thumbnails come from an external API
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center section-bg-dark hover:bg-opacity-30 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                      <p className="text-gray-300 text-sm">{video.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {!loading && !error && videos.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-300 text-lg">No videos found.</p>
              </div>
            )}
            
            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="flex justify-center mt-10 space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === 1 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`w-10 h-10 rounded-md ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === totalPages 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="mt-16 max-w-4xl mx-auto" style={sectionStyle}>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Want to Create Your Own Spectacular Moment?</h2>
                <p className="text-gray-200 mb-6">
                  Let us design a custom fireworks display for your next special event. 
                  Our team of experts will create a memorable experience that will leave 
                  your guests in awe.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/packages"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    View Packages
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 