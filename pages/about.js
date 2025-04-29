import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Head from 'next/head';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
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

export default function About() {
  // Card style with glass effect
  const cardStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  // Timeline data
  const timeline = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Pakistan Super Fireworks was established to bring world-class fireworks displays to Pakistan.'
    },
    {
      year: '2012',
      title: 'Training with Chinese Professionals',
      description: 'Our founder received specialized training from Chinese professionals in fireworks technology.'
    },
    {
      year: '2015',
      title: 'Introduction of Imported Fireworks',
      description: 'Began importing premium fireworks directly from China & Italy to enhance our offerings with boosting heights of up to 1200 meters.'
    },
    {
      year: '2018',
      title: 'Event Management Expansion',
      description: 'Expanded to provide complete event management solutions including sound system, stage management, security and administration services.'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our online presence with computer graphics capabilities for visualization of ideas and promo materials.'
    }
  ];

  return (
    <Layout
      title="About Us | Pakistan Super Fireworks"
      description="Learn about Pakistan's premier fireworks company - our history, our team, and our commitment to quality and safety."
      keywords="about fireworks pakistan, fireworks company history, fireworks team, event fireworks pakistan"
    >
      <Head>
        <title>About Pakistan Super FireWorks - Your Premier Fireworks Provider</title>
        <meta name="description" content="Learn about Pakistan Super FireWorks, our history, our team, and our commitment to providing the highest quality fireworks displays for all occasions." />
      </Head>

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">About <span className="gradient-text">Pakistan Super FireWorks</span></h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We are a leading firework service provider in Pakistan, serving entertainment with innovative ideas and expert artistry since 2010.
            </p>
          </motion.div>

          {/* Our Story Section */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Our <span className="gradient-text">Story</span></h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We are proud to introduce Pakistan Super Fireworks as a leading firework service provider in the country serving entertainment with innovative ideas and artwork since 2010. 
                    Our founder, Mr. Javed Ali, has vast experience in the field of fireworks and has been trained by Chinese professionals in fireworks technology.
                  </p>
                  <p>
                    Firework is a very old profession that began with the Muslims during the 11th century when Muslims were pioneers in research and technology. Muslim researchers and scientists created a mixture of phosphorous and other chemicals initially used during wars. By the passage of time, with modifications and development, it evolved into a symbol of joy and celebration.
                  </p>
                  <p>
                    Pakistan Super Fireworks is a service-oriented company providing not only fireworks services but also offering complete event management solutions under one roof. We have a computer graphics section for visualizing ideas, printing capabilities for promotional materials, and arrangements for all event requirements including sound systems, stage management, security, and administration.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-lg" style={cardStyle}>
                  <h3 className="text-xl font-bold mb-3 text-white">Did You Know?</h3>
                  <div className="relative overflow-hidden rounded-lg p-4 border border-orange-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
                    <p className="text-gray-200 italic">
                      "Fireworks can reach speeds of up to 300 kilometers per hour when launched, and our premium imports can reach heights of 1200 meters!"
                    </p>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg" style={cardStyle}>
                  <h3 className="text-xl font-bold mb-3 text-white">Our Achievements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">100+</span>
                      </div>
                      <p className="text-gray-200">Major events successfully executed</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">50+</span>
                      </div>
                      <p className="text-gray-200">Corporate clients served</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <p className="text-gray-200">Countries we import our premium fireworks from</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg" style={cardStyle}>
                  <h3 className="text-xl font-bold mb-3 text-white">Our Services</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-200 bg-black bg-opacity-40 p-2 rounded text-center">
                      <span className="block">Fireworks Displays</span>
                    </div>
                    <div className="text-gray-200 bg-black bg-opacity-40 p-2 rounded text-center">
                      <span className="block">Event Management</span>
                    </div>
                    <div className="text-gray-200 bg-black bg-opacity-40 p-2 rounded text-center">
                      <span className="block">Sound Systems</span>
                    </div>
                    <div className="text-gray-200 bg-black bg-opacity-40 p-2 rounded text-center">
                      <span className="block">Stage Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Our Values */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">Our <span className="gradient-text">Core Values</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Safety */}
              <div className="p-6 rounded-lg" style={cardStyle}>
                <div className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-white">Safety First</h3>
                <p className="text-gray-300 text-center">
                  We prioritize safety in every display we create. Our team is fully trained in handling fireworks, and we follow strict safety protocols to ensure worry-free experiences.
                </p>
              </div>

              {/* Quality */}
              <div className="p-6 rounded-lg" style={cardStyle}>
                <div className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-white">Premium Quality</h3>
                <p className="text-gray-300 text-center">
                  We source only the highest quality fireworks imported directly from China and Italy. Our fireworks have boosting heights of up to 1200 meters with various color schemes.
                </p>
              </div>

              {/* Innovation */}
              <div className="p-6 rounded-lg" style={cardStyle}>
                <div className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-white">Complete Service</h3>
                <p className="text-gray-300 text-center">
                  More than just fireworks, we provide comprehensive event management solutions including sound systems, stage design, security arrangements, and promotional materials.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Company Timeline */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">Our <span className="gradient-text">Journey</span></h2>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-orange-500 rounded-full hidden md:block"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
                  >
                    <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8">
                      <div className={`p-6 rounded-lg w-full max-w-md ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`} style={cardStyle}>
                        <div className="flex items-center mb-3">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mr-3">
                            {item.year}
                          </span>
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        </div>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center my-4 md:my-0">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-orange-500 z-10"></div>
                    </div>
                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Founder Spotlight */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">Founder <span className="gradient-text">Spotlight</span></h2>
            <div className="p-8 rounded-lg" style={cardStyle}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden relative border-4 border-orange-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-20"></div>
                    {/* If image is not available, render a placeholder */}
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">JA</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-2 text-white">Mr. Javed Ali</h3>
                  <p className="text-orange-400 text-lg mb-4">Founder & Proprietor</p>
                  <div className="prose prose-lg max-w-none text-gray-300">
                    <p>
                      The visionary behind Pakistan Super Fireworks, Mr. Javed Ali brings vast experience and expertise to our operations. Specially trained by Chinese professionals in fireworks technology, he has transformed the art of pyrotechnics in Pakistan.
                    </p>
                    <p>
                      Under his leadership, Pakistan Super Fireworks has grown to become a leading event management company with excellence in firework technology. His commitment to quality has led us to import premium fireworks directly from China and Italy, capable of reaching heights of 1200 meters with spectacular color schemes.
                    </p>
                    <p>
                      Mr. Ali's innovative approach combines traditional firework artistry with modern event management solutions, offering clients a comprehensive service that covers everything from display design to execution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 