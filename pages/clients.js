import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';

// Move allClients array outside the component to prevent recreation on every render
const allClients = [
  { 
    id: 1, 
    name: 'Pakistan Cricket Board', 
    logo: '/images/clients/client-1.png',
    testimonial: 'The tournament closing ceremony was enhanced by a world-class fireworks display that thrilled cricket fans across the nation.',
    contact: 'Mohsin Naqvi, Chairman'
  },
  { 
    id: 2, 
    name: 'Pakistan Television Network PTV', 
    logo: '/images/clients/client-2.png',
    testimonial: 'Our special events and broadcasts are consistently enhanced by Pakistan Super Fireworks\'s spectacular displays that captivate our viewers nationwide.',
    contact: 'Naeem Bokhari, Chairman'
  },
  { 
    id: 3, 
    name: 'Telenor', 
    logo: '/images/clients/client-03.png',
    testimonial: 'Pakistan Super Fireworks has been our trusted partner for corporate events and promotions. Their professional displays perfectly reflect our brand energy.',
    contact: 'Irfan Wahab Khan, CEO'
  },
  { 
    id: 4, 
    name: 'ABN-AMRO', 
    logo: '/images/clients/client-04.png',
    testimonial: 'For our special corporate events, Pakistan Super Fireworks delivered stunning displays that impressed our international and local clients alike.',
    contact: 'Robert Swaak, CEO'
  },
  { 
    id: 5, 
    name: 'Bank Alfalah', 
    logo: '/images/clients/client-05.png',
    testimonial: 'Our corporate ceremonies and branch openings are made memorable with Pakistan Super Fireworks\'s elegant and professionally managed displays.',
    contact: 'Atif Bajwa, President & CEO'
  },
  { 
    id: 6, 
    name: 'Mobilink', 
    logo: '/images/clients/client-6.png',
    testimonial: 'Pakistan Super Fireworks has consistently delivered impressive displays for our product launches and corporate events, creating the perfect atmosphere for our brand.',
    contact: 'Aamir Ibrahim, CEO'
  },
  { 
    id: 7, 
    name: 'Karachi Port Trust', 
    logo: '/images/clients/client-7.png',
    testimonial: 'Our maritime celebrations and anniversary events feature spectacular fireworks displays by Pakistan Super Fireworks that illuminate the harbor beautifully.',
    contact: 'Rear Admiral Syed Hasan Nasir Shah, Chairman'
  },
  { 
    id: 8, 
    name: 'Destination Pakistan 2007', 
    logo: '/images/clients/client-8.png',
    testimonial: 'The tourism promotion events were significantly enhanced by Pakistan Super Fireworks\'s breathtaking displays, showcasing Pakistan\'s beauty to international visitors.',
    contact: 'Tourism Development Corporation of Pakistan'
  },
  { 
    id: 9, 
    name: 'Warid', 
    logo: '/images/clients/client-9.png',
    testimonial: 'Our corporate events and promotional campaigns gain extra visibility and excitement with Pakistan Super Fireworks\'s professional pyrotechnic displays.',
    contact: 'Telecom Management'
  },
  { 
    id: 10, 
    name: 'Pakistan Government', 
    logo: '/images/clients/client-10.png',
    testimonial: 'National celebrations and state events are made more special with Pakistan Super Fireworks\'s patriotic and elegant fireworks displays that unite the nation.',
    contact: 'Ministry of Information and Broadcasting'
  },
  { 
    id: 11, 
    name: 'Castrol', 
    logo: '/images/clients/client-11.png',
    testimonial: 'Pakistan Super Fireworks delivered high-energy displays for our product launches and sponsorship events that perfectly matched our dynamic brand image.',
    contact: 'Amir Paracha, CEO Castrol Pakistan'
  },
  { 
    id: 12, 
    name: 'City District Government Karachi', 
    logo: '/images/clients/client-12.png',
    testimonial: 'For city-wide celebrations and public events, we rely on Pakistan Super Fireworks to create safe and spectacular displays that delight our citizens.',
    contact: 'Office of the Commissioner Karachi'
  },
  { 
    id: 13, 
    name: 'Chief Minister Of Sindh', 
    logo: '/images/clients/client-13.png',
    testimonial: 'Official provincial functions and celebrations are consistently enhanced by Pakistan Super Fireworks\'s professional and elegant displays.',
    contact: 'Syed Murad Ali Shah, Chief Minister'
  },
  { 
    id: 14, 
    name: 'Pakistan Military Academy', 
    logo: '/images/clients/client-14.png',
    testimonial: 'Graduation ceremonies and special military functions feature precise and patriotic fireworks displays that honor our traditions of excellence.',
    contact: 'Commandant, Pakistan Military Academy'
  },
  { 
    id: 15, 
    name: 'Pakistan Air Force', 
    logo: '/images/clients/client-15.png',
    testimonial: 'Our air shows and defense exhibitions are perfectly complemented by Pakistan Super Fireworks\'s synchronized displays that showcase national pride.',
    contact: 'Air Chief Marshal Zaheer Ahmed Baber Sidhu, Chief of Air Staff'
  },
  { 
    id: 16, 
    name: 'Geo Super', 
    logo: '/images/clients/client-16.png',
    testimonial: 'Major sporting events and broadcast celebrations are made more dynamic with Pakistan Super Fireworks\'s television-friendly pyrotechnic displays.',
    contact: 'Programming Director'
  },
  { 
    id: 17, 
    name: 'Hamara Karachi', 
    logo: '/images/clients/client-17.png',
    testimonial: 'City festivals and cultural celebrations are brought to life with Pakistan Super Fireworks\'s community-oriented displays that celebrate our diverse heritage.',
    contact: 'Event Management Team'
  },
  { 
    id: 18, 
    name: 'Jang News', 
    logo: '/images/clients/client-18.png',
    testimonial: 'Our media events and anniversary celebrations are enhanced by Pakistan Super Fireworks\'s visually stunning displays that make headlines across the country.',
    contact: 'Mir Shakil-ur-Rahman, Editor-in-Chief'
  },
  { 
    id: 19, 
    name: 'Pearl Continental', 
    logo: '/images/clients/client-19.png',
    testimonial: 'Our luxury hotel hosts exceptional events for discerning guests, with Pakistan Super Fireworks providing sophisticated fireworks displays for weddings and galas.',
    contact: 'Hashoo Group Management'
  },
  { 
    id: 20, 
    name: 'Pepsi', 
    logo: '/images/clients/client-20.png',
    testimonial: 'Our brand activations and promotional events feature energetic fireworks displays by Pakistan Super Fireworks that perfectly capture our youthful spirit.',
    contact: 'Furqan Ahmed Syed, CEO PepsiCo Pakistan'
  },
  { 
    id: 21, 
    name: 'Royal Bank Of Scotland', 
    logo: '/images/clients/client-21.png',
    testimonial: 'Corporate milestones and financial sector events are celebrated with elegant displays by Pakistan Super Fireworks that reflect our prestigious heritage.',
    contact: 'Banking Operations Pakistan'
  },
  { 
    id: 22, 
    name: 'SMS Sports Management', 
    logo: '/images/clients/client-22.png',
    testimonial: 'Our sporting events and tournaments conclude with spectacular fireworks shows that create lasting memories for athletes and spectators alike.',
    contact: 'Sports Management Team'
  },
  { 
    id: 23, 
    name: 'ARY Music', 
    logo: '/images/clients/client-23.png',
    testimonial: 'Music awards and concert events gain an extra dimension with Pakistan Super Fireworks\'s rhythm-synchronized displays that amplify the entertainment experience.',
    contact: 'ARY Digital Network'
  },
  { 
    id: 24, 
    name: 'Zong', 
    logo: '/images/clients/client-24.png',
    testimonial: 'Our brand launches and corporate events feature dynamic fireworks displays by Pakistan Super Fireworks that help us connect with our audience nationwide.',
    contact: 'Wang Hua, Chairman & CEO'
  },
  { 
    id: 25, 
    name: 'Karachi Youth Initiative', 
    logo: '/images/clients/client-25.png',
    testimonial: 'Youth festivals and educational events are made more inspiring with Pakistan Super Fireworks\'s creative displays that engage and excite young participants.',
    contact: 'Youth Development Program'
  },
  { 
    id: 26, 
    name: 'K-Electric', 
    logo: '/images/clients/client-26.png',
    testimonial: 'Our corporate milestones and community initiatives are celebrated with vibrant fireworks displays that illuminate Karachi in spectacular fashion.',
    contact: 'Moonis Alvi, CEO'
  },
  { 
    id: 27, 
    name: 'Beach Luxury Karachi', 
    logo: '/images/clients/client-27.png',
    testimonial: 'Seaside events and exclusive gatherings at our hotel feature elegant fireworks displays by Pakistan Super Fireworks that complement our beautiful waterfront setting.',
    contact: 'Avari Hotels Management'
  },
];

export default function Clients() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  // Memoized pagination calculations to improve performance
  const { currentClients, totalPages } = useMemo(() => {
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    return {
      currentClients: allClients.slice(indexOfFirstClient, indexOfLastClient),
      totalPages: Math.ceil(allClients.length / clientsPerPage)
    };
  }, [currentPage, clientsPerPage]);

  // Memoized animation variants to prevent unnecessary recalculations
  const animations = useMemo(() => ({
    fadeInUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
      }
    },
    staggerChildren: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2
        }
      }
    }
  }), []);
  
  // For sections that need a proper visual style with the background
  const sectionOverlayStyle = {
    position: 'relative',
    zIndex: 1
  };

  // Handle pagination with useCallback to prevent recreation on every render
  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of client section when changing pages
    document.querySelector('.section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Generate pagination buttons with memoization
  const paginationButtons = useMemo(() => {
    return [...Array(totalPages).keys()].map(number => (
      <button
        key={number + 1}
        onClick={() => paginate(number + 1)}
        className={`px-3 py-1 rounded-md ${currentPage === number + 1 ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        aria-label={`Page ${number + 1}`}
      >
        {number + 1}
      </button>
    ));
  }, [totalPages, currentPage, paginate]);

  return (
    <Layout title="Our Clients | Pakistan Super Fireworks">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-black bg-opacity-60" style={sectionOverlayStyle}></div>
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our <span className="gradient-text">Clients</span>
            </h1>
            <p className="text-xl text-gray-300">
              We&apos;re proud to have worked with some of Pakistan&apos;s most prestigious organizations and corporations.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Clients & Testimonials */}
      <section className="section">
        <div className="absolute inset-0 bg-black bg-opacity-70" style={sectionOverlayStyle}></div>
        <div className="container relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our clients include leading banks, energy companies, corporations, and government organizations throughout Pakistan.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={animations.staggerChildren}
          >
            {currentClients.map((client) => (
              <motion.div 
                key={client.id} 
                variants={animations.fadeInUp}
                className="card p-8 bg-black bg-opacity-60 backdrop-blur-sm"
              >
                <div className="h-24 flex items-center justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-2 overflow-hidden">
                    <Image 
                      src={client.logo} 
                      alt={`${client.name} logo`}
                      width={100}
                      height={100}
                      className="object-contain"
                      priority={client.id <= 3} // Prioritize loading first few images
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-center mb-4 text-white">{client.name}</h3>
                
                <div className="mb-6">
                  <p className="text-gray-300 italic text-center">&quot;{client.testimonial}&quot;</p>
                </div>
                
                <div className="text-center text-sm text-gray-400">
                  <p>{client.contact}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2" aria-label="Pagination">
                <button 
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-primary-700 text-white hover:bg-primary-600'}`}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                
                {paginationButtons}
                
                <button 
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-primary-700 text-white hover:bg-primary-600'}`}
                  aria-label="Next page"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
      
      {/* Partnership Section */}
      <section className="section">
        <div className="absolute inset-0 bg-black bg-opacity-70" style={sectionOverlayStyle}></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Become Our <span className="gradient-text">Partner</span></h2>
              <p className="text-gray-300 mb-8">
                We offer special rates and customized packages for corporate clients, financial institutions, and government organizations who work with us regularly.
              </p>
              
              <h3 className="text-xl font-bold mb-4 text-white">Partnership Benefits</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Priority booking for peak seasons",
                  "Customized displays tailored to your specific events",
                  "Discounted rates on bulk orders",
                  "Dedicated account manager for seamless coordination",
                  "Early access to new products and special effects",
                  "Joint marketing opportunities"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-700 mr-2">✓</span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <Link 
                  href="/contact" 
                  className="btn btn-primary"
                >
                  Contact Us to Partner
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative h-96 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-700 overflow-hidden">
                <Image 
                  src="/images/partnership.jpg" 
                  alt="Partnership with Pakistan Super Fireworks" 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover"
                  quality={85}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section">
        <div className="absolute inset-0 bg-black bg-opacity-50" style={sectionOverlayStyle}></div>
        <div className="container relative z-10">
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
                Ready to Collaborate?
              </motion.h2>
              
              <motion.p 
                className="text-white text-lg mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Whether you&apos;re planning a corporate event, product launch, or public celebration, we have the expertise to make it memorable
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
    </Layout>
  );
} 