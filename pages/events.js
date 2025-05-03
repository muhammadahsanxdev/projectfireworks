import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';

export default function Events() {
  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Wedding Celebrations',
      description: 'Make your special day even more memorable with our spectacular wedding fireworks displays designed to create a magical atmosphere as you celebrate your love.',
      image: '/images/event-wedding.jpg',
      features: [
        'Custom choreographed displays',
        'Indoor-safe options available',
        'Professional setup and execution',
        'Synchronized with music',
      ]
    },
    {
      id: 2,
      title: 'Corporate Events',
      description: 'Impress your clients, partners, and employees with our corporate fireworks displays. Perfect for product launches, annual celebrations, and milestone achievements.',
      image: '/images/event-corporate.jpg',
      features: [
        'Branded displays with company colors',
        'Indoor and outdoor options',
        'Professional coordination with your event team',
        'Timed precision for key moments',
      ]
    },
    {
      id: 3,
      title: 'Private Parties',
      description: 'Elevate your private gatherings with personalized fireworks displays that will leave your guests in awe. From birthdays to anniversaries, we create unforgettable moments.',
      image: '/images/event-party.jpg',
      features: [
        'Customized to your party theme',
        'Options for all budget ranges',
        'Safe solutions for residential areas',
        'Professional technicians handling everything',
      ]
    },
    {
      id: 4,
      title: 'National Celebrations',
      description: "Celebrate Pakistan's national days with patriotic fireworks displays that honor our heritage and bring communities together in spectacular fashion.",
      image: '/images/event-national.jpg',
      features: [
        'Large-scale displays for public events',
        'Patriotic colors and effects',
        'Coordination with local authorities',
        'Safety management for large crowds',
      ]
    },
  ];
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Events & Services - Pakistan Super Fireworks</title>
        <meta name="description" content="Explore our premium fireworks display services for weddings, corporate events, private parties, and national celebrations across Pakistan." />
      </Head>
      
      {/* Main Content Wrapper */}
      <div className="relative z-10">
        <section className="pt-28 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Event <span className="gradient-text">Services</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Create unforgettable moments with our professional fireworks displays for all types of celebrations and events across Pakistan.
              </p>
            </motion.div>
            
            <div className="space-y-24">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id}
                  className="section-bg-dark rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className={`h-64 lg:h-auto relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-500 opacity-80"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">{event.title}</span>
                      </div>
                    </div>
                    
                    <div className={`p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{event.title}</h2>
                      <p className="text-gray-300 mb-6">{event.description}</p>
                      
                      <h3 className="text-xl font-bold mb-4 text-white">Features</h3>
                      <ul className="space-y-3 mb-8">
                        {event.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-red-500 mr-2">✓</span>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link 
                        href="/contact" 
                        className="inline-block py-3 px-6 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                      >
                        Inquire About This Service
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Our <span className="gradient-text">Process</span>
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                We follow a comprehensive process to ensure that every event is executed flawlessly and safely
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Consultation',
                  description: 'We begin with a detailed consultation to understand your vision, event details, venue constraints, and budget considerations.',
                  icon: '💬',
                  step: '01'
                },
                {
                  title: 'Custom Design',
                  description: 'Our team creates a custom display design tailored to your event, with considerations for timing, music synchronization, and overall theme.',
                  icon: '✏️',
                  step: '02'
                },
                {
                  title: 'Safety Planning',
                  description: 'We conduct a thorough safety assessment, secure necessary permits, and develop a comprehensive safety plan for your event.',
                  icon: '🛡️',
                  step: '03'
                },
                {
                  title: 'Execution',
                  description: 'Our professional technicians handle the setup, execution, and cleanup of your display, ensuring a flawless and memorable experience.',
                  icon: '🎆',
                  step: '04'
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="section-bg-dark rounded-xl p-8 h-full relative z-10">
                    <div className="absolute right-6 top-6 text-white text-6xl font-bold">{step.step}</div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center mb-6">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                  
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                      <div className="w-12 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl overflow-hidden p-8 md:p-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Create Spectacular Moments?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-white">
                Contact us today to discuss how we can make your next event unforgettable with our custom fireworks displays.
              </p>
              <Link 
                href="/contact" 
                className="inline-block py-3 px-8 bg-white text-red-600 font-medium rounded-lg transition-all duration-200 hover:bg-gray-100"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 