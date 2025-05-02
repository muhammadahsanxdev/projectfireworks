import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Debounce scroll event for better performance
    let timeoutId;
    const handleScrollDebounced = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', handleScrollDebounced, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollDebounced);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Videos', href: '/videos' },
    { name: 'Clients', href: '/clients' },
    { name: 'Packages', href: '/packages' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Use a consistent initial state for server rendering
  const headerClasses = isMounted && isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3';
  const textColorClass = isMounted && isScrolled ? 'text-gray-800' : 'text-white'; // White when transparent, dark when white background

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex-shrink-0">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image 
                  src="/images/logo.png" 
                  alt="PSFW Logo" 
                  width={64}
                  height={64}
                  priority
                />
              </div>
            <span className="text-sm sm:text-lg font-heading font-bold">
              <span className="gradient-text">Pakistan</span>
              <span className="ml-1 gradient-text">Super</span>
              <span className={`ml-1 gradient-text`}>Fireworks</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-6">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={link.name === "Contact Us" 
                ? "nav-link font-medium btn btn-primary text-xs lg:text-sm whitespace-nowrap py-2 px-4" 
                : `nav-link font-medium ${textColorClass} hover:text-primary-500 hover:border-b-2 hover:border-primary-500 pb-1 text-xs lg:text-sm whitespace-nowrap`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-50 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {!isMenuOpen ? (
            <div className="w-6 flex flex-col space-y-1.5">
              <span className={`w-full h-0.5 ${isScrolled ? 'bg-primary-700' : 'bg-white'} block`}></span>
              <span className={`w-full h-0.5 ${isScrolled ? 'bg-primary-600' : 'bg-white'} block`}></span>
              <span className={`w-full h-0.5 ${isScrolled ? 'bg-primary-800' : 'bg-white'} block`}></span>
            </div>
          ) : null}
        </button>

        {/* Mobile Menu Component */}
        {isMounted && (
          <MobileMenu 
            navLinks={navLinks} 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
          />
        )}
      </div>
    </header>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Header); 