import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRef } from 'react';

export default function Packages() {
  // Section style for better text readability
  const sectionStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '0.5rem',
    padding: '2rem',
    backdropFilter: 'blur(5px)'
  };

  const videoRef = useRef(null);

  const packages = [
    {
      id: 1,
      name: 'Basic Package',
      price: 'PKR 75,000',
      duration: '6-8 minutes',
      description: 'Our entry-level package for memorable celebrations.',
      features: [
        'Variety of colorful effects',
        'Basic color scheme',
        'Professional setup and firing',
        'Safety equipment and supervision',
        'Digital video recording'
      ]
    }
  ];

  return (
    <Layout title="Fireworks Packages | Pakistan Super Fireworks">      
      {/* Main Content */}
      <div className="relative z-10 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our <span className="text-gradient">Packages</span></h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Start with our standard package or request a custom display designed specifically for your special occasion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Basic Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black bg-opacity-85 backdrop-blur-sm rounded-lg overflow-hidden section-bg-dark border border-gray-800 shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{packages[0].name}</h3>
                  <div className="text-3xl font-bold text-white mb-1">{packages[0].price}</div>
                  <div className="text-sm text-gray-300 mb-4">{packages[0].duration}</div>
                  <p className="text-gray-200 mb-6">{packages[0].description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {packages[0].features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/contact">
                    <button
                      className="w-full py-3 rounded-md font-medium transition-all duration-200 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white"
                    >
                      Request Quote
                    </button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Custom Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-lg overflow-hidden bg-gradient-to-b from-orange-600 to-red-700 ring-4 ring-yellow-400"
              >
                <div className="p-6 section-bg-dark">
                  <div className="bg-yellow-400 text-black font-bold py-1 px-3 rounded-full text-sm inline-block mb-3">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Custom Package</h3>
                  <div className="text-3xl font-bold text-white mb-1">Tailored to Your Needs</div>
                  <div className="text-sm text-gray-300 mb-4">Customized duration</div>
                  <p className="text-gray-200 mb-6">Design your dream fireworks display exactly how you envision it.</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Possibilities Include:</h4>
                    <ul className="space-y-2">
                      {[
                        'Premium aerial fireworks',
                        'Multiple synchronized firing positions',
                        'Customizable color schemes',
                        'Professional setup and firing team',
                        'Precise music synchronization',
                        'Grand finale sequence',
                        'Professional video production',
                        'Custom logo/name display'
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/contact">
                    <button
                      className="w-full py-3 rounded-md font-medium transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 text-black"
                    >
                      Request Quote
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Video Showcase */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-16 max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Experience Our <span className="text-gradient">Fireworks</span> in Action</h2>
                <p className="text-gray-200 mt-2">Watch our spectacular displays and imagine the possibilities for your event</p>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl ring-2 ring-orange-500/30">
                <video 
                  className="w-full h-auto aspect-video object-cover" 
                  controls 
                  playsInline
                  muted 
                  loop
                  poster="/videos/fireworksworking-1.png"
                  ref={videoRef}
                >
                  <source src="/videos/fireworksworking-1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
            
            {/* Custom Package Section */}
            <div className="mt-16 max-w-4xl mx-auto" style={sectionStyle}>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Unlimited Premium <span className="text-gradient">Custom</span> Packages</h2>
                <p className="text-gray-200 mb-6">
                  We understand that every event is unique. Our team can create a custom fireworks display 
                  tailored specifically to your requirements, venue considerations, and budget. There is NO maximum limit - 
                  we can design spectacular shows of any scale for weddings, corporate events, and celebrations.
                </p>
                <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4 rounded-lg mb-6">
                  <p className="text-white font-medium">Starting at PKR 75,000 with NO upper limit - the sky is literally the limit!</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Request a Quote
                  </Link>
                  <Link
                    href="/gallery"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    View Our Gallery
                  </Link>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-16 max-w-4xl mx-auto" style={sectionStyle}>
              <h2 className="text-2xl font-bold mb-6 text-white text-center">Frequently Asked <span className="text-gradient">Questions</span></h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg section-bg-dark">
                  <h3 className="font-semibold text-lg text-white mb-2">What permits do I need for a fireworks display?</h3>
                  <p className="text-gray-200">
                    Our team handles all necessary permits and permissions required for the fireworks display. 
                    We&apos;ll work with local authorities to ensure everything is properly documented and approved.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg section-bg-dark">
                  <h3 className="font-semibold text-lg text-white mb-2">How much space is needed for a fireworks display?</h3>
                  <p className="text-gray-200">
                    The required space depends on the size of the display. For our standard package, we typically 
                    need at least 30x30 meters of clear space. Larger displays require more area. Our team will 
                    assess your venue during consultation.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg section-bg-dark">
                  <h3 className="font-semibold text-lg text-white mb-2">Can you synchronize fireworks with music?</h3>
                  <p className="text-gray-200">
                    Yes! We can synchronize your fireworks display with music for a more immersive experience. 
                    This is a popular option for weddings and corporate events.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg section-bg-dark">
                  <h3 className="font-semibold text-lg text-white mb-2">How far in advance should I book?</h3>
                  <p className="text-gray-200">
                    We recommend booking at least 4-6 weeks in advance for standard packages, and 8-12 weeks 
                    for custom displays, especially during peak seasons (wedding season, New Year&apos;s, etc.).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 