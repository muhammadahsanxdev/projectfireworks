import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import VideoSection from '../components/VideoSection';

// Animation variants with optimized settings
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  const [, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [videosError, setVideosError] = useState(null);
  
  // For sections that need their own background but keep the same visual
  const sectionOverlayStyle = {
    position: 'relative',
    zIndex: 1
  };

  // Fetch videos from Dailymotion with better error handling and caching
  useEffect(() => {
    const fetchDailymotionVideos = async () => {
      try {
        setVideosLoading(true);
        
        // Check for cached data to avoid unnecessary API calls
        const cachedData = sessionStorage.getItem('dailymotionVideos');
        const cachedTimestamp = sessionStorage.getItem('dailymotionVideosTimestamp');
        const cacheExpiryTime = 30 * 60 * 1000; // 30 minutes cache expiry
        
        // Use cached data if available and not expired
        if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp) < cacheExpiryTime)) {
          setFeaturedVideos(JSON.parse(cachedData));
          setVideosLoading(false);
          return;
        }
        
        // Use AbortController for request timeout and cancellation
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        // Fetch videos from anum-akram channel
        const response = await fetch(
          `https://api.dailymotion.com/user/anum-akram/videos?fields=id,title,description,thumbnail_url,channel&limit=4`,
          { 
            signal: controller.signal,
            headers: {
              'Accept': 'application/json'
            }
          }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match our application structure
        if (data.list && data.list.length > 0) {
          const transformedVideos = data.list.map((video) => ({
            id: video.id,
            title: video.title || "Fireworks Display",
            description: video.description || "Spectacular fireworks display by Pakistan Super Fireworks",
            videoId: video.id,
            thumbnail: video.thumbnail_url || "/images/video-fallback.jpg"
          }));
          
          setFeaturedVideos(transformedVideos);
          
          // Cache the results in sessionStorage
          try {
            sessionStorage.setItem('dailymotionVideos', JSON.stringify(transformedVideos));
            sessionStorage.setItem('dailymotionVideosTimestamp', Date.now().toString());
          } catch (storageError) {
            console.warn("Could not cache video data:", storageError);
          }
        } else {
          // Fallback data if API returns empty results
          const fallbackVideos = [
            {
              id: 'fallback1',
              title: 'Wedding Fireworks Display',
              description: 'Spectacular fireworks display for wedding celebrations by Pakistan Super Fireworks',
              videoId: 'fallback1',
              thumbnail: '/images/fireworks-1.jpg'
            },
            {
              id: 'fallback2',
              title: 'New Year Celebration',
              description: 'Amazing New Year fireworks by Pakistan Super Fireworks',
              videoId: 'fallback2',
              thumbnail: '/images/fireworks-2.jpeg'
            },
            {
              id: 'fallback3',
              title: 'Corporate Event Fireworks',
              description: 'Impressive fireworks for a corporate event in Islamabad',
              videoId: 'fallback3',
              thumbnail: '/images/fireworks-3.jpg'
            },
            {
              id: 'fallback4',
              title: 'Independence Day Display',
              description: 'Patriotic fireworks for Pakistan Independence Day',
              videoId: 'fallback4',
              thumbnail: '/images/fireworks-1.jpg'
            }
          ];
          setFeaturedVideos(fallbackVideos);
        }
      } catch (error) {
        console.error("Error fetching Dailymotion videos:", error.message);
        if (error.name === 'AbortError') {
          setVideosError("Request timed out. Please check your connection and try again.");
        } else {
          setVideosError("Failed to load videos. Using fallback content.");
          
          // Use fallback data on error
          const fallbackVideos = [
            {
              id: 'fallback1',
              title: 'Wedding Fireworks Display',
              description: 'Spectacular fireworks display for wedding celebrations by Pakistan Super Fireworks',
              videoId: 'fallback1',
              thumbnail: '/images/fireworks-1.jpg'
            },
            {
              id: 'fallback2',
              title: 'New Year Celebration',
              description: 'Amazing New Year fireworks by Pakistan Super Fireworks',
              videoId: 'fallback2',
              thumbnail: '/images/fireworks-2.jpeg'
            }
          ];
          setFeaturedVideos(fallbackVideos);
        }
      } finally {
        setVideosLoading(false);
      }
    };
    
    fetchDailymotionVideos();
  }, []);

  // Mock data for clients
  const featuredClients = [
    { 
      id: 1, 
      name: 'Lahore Royal Events', 
      testimonial: 'We&apos;ve partnered with FireworkPK for all our major events. Their professional team and high-quality products have never disappointed our clients.',
      contact: 'Muhammad Abbas, Event Director'
    },
    { 
      id: 2, 
      name: 'Islamabad Grand Hotel', 
      testimonial: 'The New Year&apos;s Eve celebration at our hotel was a huge success thanks to the spectacular fireworks display arranged by FireworkPK.',
      contact: 'Sarah Khan, Events Manager'
    },
    { 
      id: 3, 
      name: 'Pakistan Wedding Association', 
      testimonial: 'Our members consistently report positive experiences when working with FireworkPK for wedding celebrations. Their attention to detail is remarkable.',
      contact: 'Asim Malik, Association President'
    },
  ];

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setIsVideoError(true);
    console.error('Video failed to load');
  };
  
  const handleLogoError = () => {
    setLogoError(true);
    console.error('Failed to load logo image');
  };

  return (
    <Layout>
      <Head>
        <title>Pakistan Super FireWorks - Pakistan&apos;s Biggest Digital Fire Works And Pyro Technical Company</title>
        <meta name="description" content="Pakistan&apos;s Biggest Digital Fire Works Company. We offer professional fireworks displays for weddings, corporate events, New Year&apos;s Eve, and all special occasions in Islamabad, Lahore, and across Pakistan." />
      </Head>
      
      {/* Main Content Wrapper - All sections are relative to this */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Video Background with Error Handling */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            {!isVideoError ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute min-w-full min-h-full object-cover"
                onLoadedData={handleVideoLoaded}
                onError={handleVideoError}
              >
                <source src="/videos/fireworks-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              // Fallback for video error - transparent div that shows background
              <div className="absolute inset-0 bg-transparent"></div>
            )}
            {/* Enhanced overlay with gradient for better text readability */}
            <div className="absolute inset-0 bg-black/60 bg-opacity-60 shadow-2xl"></div>
            {/* Additional gradient shadow effect at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-80"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">
              <motion.div 
                className="flex flex-col justify-center"
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
                  variants={fadeInUp}
                >
                  Pakistan&apos;s Biggest <br />
                  <span className="gradient-text">Digital Fire Works</span><br/>
                  And Pyro Technical Company
                </motion.h1>
                
                <motion.p 
                  className="text-lg text-gray-200 mb-8 max-w-lg font-bold"
                  variants={fadeInUp}
                >
                  Professional firework displays for weddings, corporate events, New Year&apos;s Eve celebrations, and Independence Day across Islamabad, Lahore, Karachi and all of Pakistan.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeInUp}
                >
                  <div className="text-center mt-10">
                    <Link href="/contact" className="bg-gradient-primary text-white py-3 px-6 rounded-lg shadow-md font-medium hover:shadow-lg transition-all duration-200">
                      Contact Us  
                    </Link>
                  </div>
                  <div className="text-center mt-10">
                    <Link href="/packages" className="bg-gradient-primary text-white py-3 px-6 rounded-lg shadow-md font-medium hover:shadow-lg transition-all duration-200">
                      Explore Packages
                    </Link>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-20 grid grid-cols-3 gap-6"
                  variants={fadeInUp}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                      <span className="text-white font-bold">★</span>
                    </div>
                    <span className="text-center text-gray-200 font-medium">Premium Quality</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                      <span className="text-white font-bold">⚡</span>
                    </div>
                    <span className="text-center text-gray-200 font-medium">Nationwide Service</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <span className="text-center text-gray-200 font-medium">Safety Guaranteed</span>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative order-first lg:order-last h-[400px] md:h-[500px] lg:h-[600px] w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Static Image - Using next/image for optimization */}
                <div className="absolute inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-start lg:pt-10">
                  <div className="relative flex flex-col items-center">
                    {!logoError ? (
                      <Image 
                        src="/images/logo.png" 
                        alt="Pakistan Super FireWorks Logo"
                        width={300}
                        height={300}
                        quality={90}
                        className="object-contain drop-shadow-lg h-auto"
                        priority
                        onError={handleLogoError}
                      />
                    ) : (
                      <div className="w-[300px] h-[300px] flex items-center justify-center rounded-full bg-primary-600 text-white">
                        <span className="text-4xl font-bold">PSFW</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 text-center w-full px-4">
                    <p className="text-xl md:text-3xl text-white font-bold">
                      <span className="gradient-text text-3xl md:text-4xl lg:text-5xl whitespace-nowrap">Pakistan Super Fireworks</span>
                      <br/>
                      <span className="text-lg md:text-xl">Event Management Company</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* About Section with SEO keywords */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-black bg-opacity-60" style={sectionOverlayStyle}></div>
          <div className="container relative z-10 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
                Pakistan&apos;s Leading <span className="gradient-text">Fireworks Company</span>
              </h2>
              <div className="prose prose-lg max-w-none text-gray-200">
                <p>
                  Pakistan Super FireWorks is Pakistan&apos;s Biggest Digital Fire Works And Pyro Technical Company, serving clients across Islamabad, Lahore, Karachi, and nationwide. Our team brings extensive experience in the art of fireworks displays to create memorable experiences for all types of celebrations.
                </p>
                <p>
                  Fireworks have a rich history in Muslim culture, dating back to the 11th century when Muslims were pioneers in scientific research. What began as a mixture of phosphorous and chemicals used in warfare has evolved into spectacular displays of joy and celebration that illuminate special occasions throughout Pakistan.
                </p>
                <p>
                  Whether you&apos;re planning a wedding celebration, corporate event, New Year&apos;s party, or Independence Day festivities, our professional team delivers custom firework displays tailored to your specific requirements. We serve clients in all major cities including Islamabad, Lahore, Karachi, Multan, and beyond.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Videos Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-black bg-opacity-70" style={sectionOverlayStyle}></div>
          <div className="container relative z-10 py-16">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Featured <span className="gradient-text">Videos</span>
              </motion.h2>
              <motion.p 
                className="text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Watch our spectacular fireworks displays in action across Pakistan
              </motion.p>
            </div>
            
            {videosLoading && (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {videosError && (
              <div className="text-center py-8">
                <p className="text-red-400 text-lg">{videosError}</p>
              </div>
            )}
            
            {!videosLoading && !videosError && (
              <VideoSection videos={featuredVideos} className="dark no-heading" />
            )}
            
            {!videosLoading && !videosError && featuredVideos.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-300 text-lg">No videos found.</p>
              </div>
            )}
            
            <div className="text-center mt-10">
              <Link href="/videos" className="bg-gradient-primary text-white py-3 px-6 rounded-lg shadow-md font-medium hover:shadow-lg transition-all duration-200">
                View All Videos
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services/Events Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-black bg-opacity-70" style={sectionOverlayStyle}></div>
          <div className="container relative z-10 py-16">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our <span className="gradient-text">Services</span>
              </motion.h2>
              <motion.p 
                className="text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                We provide premium fireworks for all types of celebrations and events throughout Pakistan
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Wedding Celebrations',
                  icon: '💍',
                  description: 'Make your wedding day in Islamabad, Lahore or anywhere in Pakistan memorable with our custom fireworks displays tailored for your special moment.',
                },
                {
                  title: 'Corporate Events',
                  icon: '🏢',
                  description: 'Impress clients and employees with professional pyrotechnics for product launches, conferences, and corporate milestones.',
                },
                {
                  title: 'Public Celebrations',
                  icon: '🎉',
                  description: 'Create spectacular moments for Independence Day, New Years Eve, festivals and public gatherings across Pakistan.',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="card p-8 text-center bg-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-200 mb-6">{service.description}</p>
                  <Link href="/contact" className="text-white font-medium hover:underline">
                    Learn More →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-black bg-opacity-70" style={sectionOverlayStyle}></div>
          <div className="container relative z-10 py-16">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Get In <span className="gradient-text">Touch</span>
              </motion.h2>
              <motion.p 
                className="text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Contact us to discuss your next event
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card p-8 text-center bg-white/10 backdrop-blur-sm"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Phone</h3>
                <p className="text-gray-200 mb-2">+92 321 8255297</p>
                <p className="text-gray-200 mb-4">+92 333 2388055</p>
                <p className="text-sm text-gray-300">Call us anytime for inquiries</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="card p-8 text-center bg-white/10 backdrop-blur-sm"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">✉️</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Email</h3>
                <p className="text-gray-200 mb-4">sms.bpl68@gmail.com</p>
                <p className="text-sm text-gray-300">We&apos;ll respond promptly to your message</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="card p-8 text-center bg-white/10 backdrop-blur-sm"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Social Media</h3>
                <p className="text-gray-200 mb-4">Follow us @PAKSUPERFIREWORKS</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://facebook.com/PAKSUPERFIREWORKS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-colors hover:bg-white/30 hover:text-white"
                  >
                    <span className="text-white hover:text-white text-sm font-bold">fb</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-black bg-opacity-70" style={sectionOverlayStyle}></div>
          <div className="container relative z-10 py-16">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Trusted by <span className="gradient-text">Leading Clients</span>
              </motion.h2>
              <motion.p 
                className="text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Hear what our clients have to say about our services
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  className="card p-8 bg-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="mb-6">
                    <div className="flex items-center text-yellow-400">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                  </div>
                  <p className="italic mb-6 text-gray-200">&quot;{client.testimonial}&quot;</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{client.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{client.name}</h4>
                      <p className="text-sm text-gray-300">{client.contact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Footer Content */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-black bg-opacity-70" style={sectionOverlayStyle}></div>
          <div className="container relative z-10 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-white">
                Professional Fireworks Services <span className="gradient-text">Across Pakistan</span>
              </h2>
              <div className="prose prose-sm max-w-none text-gray-200">
                <p className="mb-4">
                  At Pakistan Super FireWorks, we provide professional firework displays for all occasions including weddings, corporate events, private parties, public celebrations, music concerts, and national events. Our services are available in Islamabad, Lahore, Karachi, Peshawar, Quetta, Multan, Faisalabad, and throughout Pakistan.
                </p>
                <p className="mb-4">
                  Our fireworks packages are customized for special occasions like Pakistani weddings, Independence Day celebrations, New Year&apos;s Eve parties, Diwali festivals, corporate product launches, and grand openings. We use only the highest quality fireworks that create stunning visual displays with vibrant colors and impressive effects.
                </p>
                <p>
                  With a strong focus on safety and professionalism, our experienced team ensures each firework display meets international standards while providing the wow factor your event deserves. Contact Pakistan&apos;s Biggest Digital Fire Works Company today for a free quote and consultation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-black bg-opacity-60" style={sectionOverlayStyle}></div>
          <div className="container relative z-10 py-16">
            <motion.div 
              className="relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
              
              <div className="relative py-16 px-8 md:py-24 md:px-16 text-center">
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Ready to Light Up Your Celebration?
                </motion.h2>
                
                <motion.p 
                  className="text-white text-lg mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Contact Pakistan&apos;s Biggest Digital Fire Works Company for your next wedding, corporate event, or special celebration in Islamabad, Lahore, Karachi or anywhere in Pakistan
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link 
                    href="/contact" 
                    className="btn bg-white text-primary-700 hover:bg-white/90 hover:scale-105"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 
