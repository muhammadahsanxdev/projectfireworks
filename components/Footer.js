import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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

// Social media icons as SVG components
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const WhatsappIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M17.415 14.382c-.298-.149-1.759-.867-2.031-.967-.272-.099-.47-.148-.669.15-.198.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.241-.579-.486-.5-.668-.51-.174-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.422 7.403h-.004a9.87 9.87 0 01-5.032-1.378l-.36-.214-3.742.982.999-3.648-.235-.374a9.861 9.861 0 01-1.511-5.26c.002-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm0-18.271A11.86 11.86 0 006.02 7.08 11.779 11.779 0 003.136 14c0 6.54 5.326 11.863 11.863 11.863 6.538 0 11.864-5.324 11.864-11.863 0-6.54-5.326-11.864-11.864-11.864z" clipRule="evenodd" />
  </svg>
);

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('idle');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscriptionStatus('submitting');
    
    try {
      // In a real application, this would send data to a backend API
      // For now, we'll simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form and show success message
      setEmail('');
      setSubscriptionStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscriptionStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 3000);
    }
  };

  const footerLinks = {
    information: [
      { name: 'About Us', href: '/about' },
      { name: 'Events', href: '/events' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Videos', href: '/videos' },
      { name: 'Clients', href: '/clients' },
      { name: 'Packages', href: '/packages' },
      { name: 'Contact Us', href: '/contact' },
    ],
    contact: [
      { name: 'Email', value: 'sms.bpl68@gmail.com', icon: 'email' },
      { name: 'Phone', value: '+92 333 2388055, +92 321 8255297', icon: 'phone' },
      { name: 'Address', value: 'B-11 Block H North Nazimabad, Karachi, Pakistan', icon: 'location' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon />, href: 'https://facebook.com/PAKSUPERFIREWORKS' },
    { name: 'YouTube', icon: <YoutubeIcon />, href: 'https://www.youtube.com/channel/UCKbYN-TNU9w3Jk-ktxFcnEA' },
    { name: 'Instagram', icon: <InstagramIcon />, href: 'https://instagram.com/pakistansuperfireworks' },
    { name: 'WhatsApp', icon: <WhatsappIcon />, href: 'https://wa.me/923332388055' },
  ];

  // The main issue is the date in the copyright, which will differ between server and client
  const currentYear = isMounted ? new Date().getFullYear() : '2024'; // Use fixed year for server rendering

  // Contact icon components
  const contactIcon = (name) => {
    switch (name) {
      case 'email':
        return (
          <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'location':
        return (
          <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8 border-t border-orange-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative w-20 h-20">
                <Image 
                  src="/images/logo.png" 
                  alt="PSFW Logo" 
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </div>
              <div className="text-xl font-heading font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Pakistan Super</span>
                <span className="ml-1">FireWorks</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Pakistan's Biggest Digital Fire Works And Pyro Technical Company. We bring light, color, and excitement to your celebrations across the country.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-gradient-to-r from-red-600 to-orange-500 hover:scale-110 transform duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Information */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-heading font-bold mb-6 relative pl-3 border-l-4 border-gradient-to-r from-red-600 to-orange-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                  >
                    <svg className="w-4 h-4 mr-2 text-orange-600 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-heading font-bold mb-6 relative pl-3 border-l-4 border-gradient-to-r from-red-600 to-orange-500">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((item) => (
                <li key={item.name} className="flex items-start">
                  {contactIcon(item.icon.toLowerCase())}
                  <div>
                    <span className="text-orange-500 font-medium block">{item.name}</span>
                    <span className="text-gray-400">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
              <h4 className="text-white text-sm font-medium mb-3">Subscribe for updates</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                  required
                />
                <button 
                  type="submit" 
                  className={`${
                    subscriptionStatus === 'submitting' 
                      ? 'bg-gray-600' 
                      : 'bg-gradient-to-r from-red-600 to-orange-500 hover:shadow-glow'
                  } text-white px-4 py-2 rounded-md transition-all duration-300`}
                  disabled={subscriptionStatus === 'submitting'}
                >
                  {subscriptionStatus === 'submitting' ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
              
              {subscriptionStatus === 'success' && (
                <p className="text-green-500 text-sm mt-2">Thank you for subscribing!</p>
              )}
              
              {subscriptionStatus === 'error' && (
                <p className="text-red-500 text-sm mt-2">Subscription failed. Please try again.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Pakistan Super FireWorks. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy-policy" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/sitemap.xml" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 