import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { memo, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const MobileMenu = ({ navLinks, isMenuOpen, setIsMenuOpen }) => {
  // Create a ref for the menu container to implement focus trap
  const menuRef = useRef(null);
  const firstLinkRef = useRef(null);
  const lastLinkRef = useRef(null);
  const router = useRouter();

  // Setup focus trap for keyboard navigation
  useEffect(() => {
    if (!isMenuOpen) return;
    
    // Focus first element when menu opens
    if (firstLinkRef.current) {
      setTimeout(() => firstLinkRef.current.focus(), 100);
    }
    
    // Handle keyboard navigation within menu
    const handleKeyDown = (e) => {
      // Close on Escape
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      
      // Focus trap with Tab
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstLinkRef.current) {
          e.preventDefault();
          lastLinkRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === lastLinkRef.current) {
          e.preventDefault();
          firstLinkRef.current?.focus();
        }
      }
    };
    
    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener('keydown', handleKeyDown);
    }
    
    // Lock body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      if (menuElement) {
        menuElement.removeEventListener('keydown', handleKeyDown);
      }
      // Restore body scroll when menu is closed
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, setIsMenuOpen]);
  
  // Enhanced animation with better performance
  const menuAnimation = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };

  // Click outside to close
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          ref={menuRef}
          className="fixed inset-0 bg-white p-6 flex flex-col justify-center space-y-8 md:hidden z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuAnimation}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          {/* Overlay for better visual indication */}
          <div className="absolute inset-0 bg-black bg-opacity-5 -z-10" />
          
          {/* Close button at the top */}
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg z-20"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Navigation links */}
          <motion.nav 
            className="w-full max-w-xs mx-auto"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 }
            }}
          >
            {navLinks.map((link, index) => {
              // Special handling for first and last link (for focus trap)
              const isFirst = index === 0;
              const isLast = index === navLinks.length - 1;
              const isActive = router.pathname === link.href;
              
              return (
                <motion.div
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 10 }
                  }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    ref={isFirst ? firstLinkRef : isLast ? lastLinkRef : null}
                    className={`block w-full text-xl font-medium py-4 px-4 my-2 rounded-md transition-colors ${
                      link.name === "Contact Us"
                        ? "bg-gradient-to-r from-red-600 to-orange-500 text-white text-center shadow-lg transform hover:scale-105 transition-transform"
                        : `text-gray-800 hover:bg-gray-100 border-l-4 ${isActive ? "bg-gray-50" : ""}`
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      borderLeftColor: link.name === "Contact Us" ? "transparent" : 
                        isActive ? '#ff5500' :
                        index % 3 === 0 ? '#ff5500' : 
                        index % 3 === 1 ? '#ff7733' : 
                        '#ff9966'
                    }}
                  >
                    {link.name}
                    {isActive && link.name !== "Contact Us" && (
                      <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(MobileMenu); 