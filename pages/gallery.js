import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Constants
const ITEMS_PER_PAGE = 12; // Show 12 images per page for better grid layout

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
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
      staggerChildren: 0.08
    }
  }
};

// ImageModal component for lightbox functionality
const ImageModal = ({ isOpen, onClose, currentImage, images, onPrevious, onNext }) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onNext, onPrevious]);
  
  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 md:p-8"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={modalVariants}
        onClick={onClose}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 md:top-6 md:right-6 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Previous button */}
        <button 
          className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Next button */}
        <button 
          className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <motion.div 
          className="relative max-w-full max-h-full"
          variants={contentVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative max-h-[80vh] flex items-center justify-center">
            <div className="relative" style={{ 
              width: "auto", 
              height: "auto", 
              maxWidth: "90vw", 
              maxHeight: "75vh" 
            }}>
              <Image 
                src={currentImage.thumbnail} 
                alt={currentImage.title}
                width={1200}
                height={800}
                style={{ 
                  objectFit: "contain", 
                  maxHeight: "75vh", 
                  width: "auto", 
                  height: "auto",
                  margin: "0 auto"
                }}
                priority
                quality={90}
              />
            </div>
          </div>
          
          {/* Image details */}
          <div className="bg-black bg-opacity-70 backdrop-blur-md p-4 mt-2 rounded-md">
            <h3 className="text-lg md:text-xl text-white font-bold">{currentImage.title}</h3>
            <p className="text-sm text-orange-400">
              {currentImage.category === 'special-events' ? 'Special Events' : 
                currentImage.category.charAt(0).toUpperCase() + currentImage.category.slice(1)}
            </p>
            {currentImage.description && (
              <p className="text-gray-300 mt-2 text-sm md:text-base">{currentImage.description}</p>
            )}
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
            {images.indexOf(currentImage) + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Gallery filter categories
const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Displays' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'corporate', label: 'Corporate Events' },
  { id: 'special-events', label: 'Special Events' }, 
  { id: 'national', label: 'National Celebrations' }
];

export default function Gallery({ galleryItems }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [animateCards, setAnimateCards] = useState(true);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800 
  });
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Handle window resize for responsive layout
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return galleryItems;
    }
    return galleryItems.filter(item => item.category === activeFilter);
  }, [activeFilter, galleryItems]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  }, [filteredItems]);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
    // Briefly disable animations when changing filters to prevent jarring transitions
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 50);
  }, [activeFilter]);

  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const handlePageChange = useCallback((pageNumber) => {
    // Scroll to gallery section when changing pages
    const galleryElement = document.getElementById('gallery-grid');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setCurrentPage(pageNumber);
  }, []);
  
  // Modal handlers
  const openModal = useCallback((image) => {
    setCurrentImage(image);
    setModalOpen(true);
  }, []);
  
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  
  const goToNextImage = useCallback(() => {
    const currentIndex = filteredItems.findIndex(img => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentImage(filteredItems[nextIndex]);
  }, [currentImage, filteredItems]);
  
  const goToPreviousImage = useCallback(() => {
    const currentIndex = filteredItems.findIndex(img => img.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentImage(filteredItems[prevIndex]);
  }, [currentImage, filteredItems]);

  // Pagination controls renderer
  const renderPaginationControls = useCallback(() => {
    if (totalPages <= 1) return null;
    
    let pages = [];
    
    // Determine range of pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    // First page
    if (startPage > 1) {
      pages.push(
        <button 
          key="first" 
          onClick={() => handlePageChange(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center section-bg-dark text-white hover:bg-gray-700 transition-colors"
          aria-label="Go to first page"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="text-gray-500 px-1">...</span>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            currentPage === i
              ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
              : 'section-bg-dark text-white hover:bg-gray-700'
          }`}
          aria-label={`Go to page ${i}`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="text-gray-500 px-1">...</span>
        );
      }
      
      pages.push(
        <button 
          key="last" 
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 rounded-full flex items-center justify-center section-bg-dark text-white hover:bg-gray-700 transition-colors"
          aria-label="Go to last page"
        >
          {totalPages}
        </button>
      );
    }
    
    return (
      <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
        {/* Previous button */}
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-full flex items-center justify-center transition-colors ${
            currentPage === 1
              ? 'text-gray-500 cursor-not-allowed'
              : 'section-bg-dark text-white hover:bg-gray-700'
          }`}
          aria-label="Previous page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pages}
        </div>
        
        {/* Next button */}
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-full flex items-center justify-center transition-colors ${
            currentPage === totalPages
              ? 'text-gray-500 cursor-not-allowed'
              : 'section-bg-dark text-white hover:bg-gray-700'
          }`}
          aria-label="Next page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  }, [currentPage, totalPages, handlePageChange]);

  // Get the relevant categories from the data
  const availableCategories = useMemo(() => {
    const categories = new Set(['all']);
    galleryItems.forEach(item => categories.add(item.category));
    return Array.from(categories);
  }, [galleryItems]);

  return (
    <Layout
      title="Fireworks Gallery | Pakistan Super Fireworks"
      description="Explore our stunning gallery of fireworks displays for weddings, corporate events, and special occasions across Pakistan."
      keywords="fireworks gallery, fireworks photos, event fireworks, wedding fireworks pakistan, display gallery"
    >
      <Head>
        <title>Gallery - Pakistan Super FireWorks</title>
        <meta name="description" content="Explore our gallery of spectacular fireworks displays from weddings, corporate events, private parties, and national celebrations across Pakistan." />
      </Head>
      
      {/* Image Modal/Lightbox */}
      <ImageModal 
        isOpen={modalOpen}
        onClose={closeModal}
        currentImage={currentImage}
        images={filteredItems}
        onPrevious={goToPreviousImage}
        onNext={goToNextImage}
      />
      
      {/* Main Content Wrapper */}
      <div className="relative z-10 overflow-x-hidden">
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Gallery</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Explore our stunning fireworks displays from various events across Pakistan. 
                Each display is custom designed to create unforgettable moments.
              </p>
            </motion.div>
            
            {/* Filter Categories */}
            <motion.div 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mb-10"
            >
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {GALLERY_CATEGORIES.filter(cat => availableCategories.includes(cat.id)).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleFilterChange(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all text-sm md:text-base ${
                      activeFilter === category.id
                        ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg'
                        : 'bg-black bg-opacity-50 backdrop-blur-sm text-gray-300 hover:bg-opacity-70'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </motion.div>
            
            {/* Gallery Stats */}
            <motion.div 
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-center mb-8 text-gray-400 text-sm"
            >
              <p>
                {filteredItems.length} {filteredItems.length === 1 ? 'display' : 'displays'} found
                {totalPages > 0 && ` • Page ${currentPage} of ${totalPages}`}
              </p>
            </motion.div>
            
            {/* Gallery Grid */}
            <motion.div 
              id="gallery-grid"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={animateCards ? "visible" : "hidden"}
              key={`${activeFilter}-${currentPage}`} // Ensures animation reruns when page or filter changes
            >
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    variants={fadeInUp}
                    whileHover={{ y: -8 }}
                    onClick={() => openModal(item)}
                  >
                    <div className="group relative w-full" style={{ aspectRatio: '4/3' }}>
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10"></div>
                      
                      <Image 
                        src={item.thumbnail} 
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48L3N2Zz4="
                      />
                      
                      {/* View icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white truncate" title={item.title}>{item.title}</h3>
                      <p className="text-sm text-orange-400 mt-1">
                        {item.category === 'special-events' ? 'Special Events' : 
                         item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-400 text-lg">No images found in this category</p>
                </div>
              )}
            </motion.div>
            
            {/* Pagination Controls */}
            {renderPaginationControls()}
            
            {/* Info Section */}
            <motion.div 
              className="mt-20 bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-8 md:p-10"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-white">Looking for a Custom Display?</h2>
                  <p className="text-gray-300 mb-4">
                    Each image represents a unique display designed for our clients. We can create similar 
                    or entirely custom displays tailored to your specific event needs.
                  </p>
                  <ul className="text-gray-300 space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Custom choreography to match music or event themes</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Various color schemes to match your event's palette</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Different durations and intensity levels available</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center flex flex-col items-center">
                  <p className="text-white text-lg mb-4">Ready to create your own spectacular moment?</p>
                  <Link 
                    href="/contact" 
                    className="inline-block py-3 px-8 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-glow transform hover:-translate-y-1"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Generate gallery items from the files in public/images/gallery
export async function getStaticProps() {
  const galleryItems = [];
  
  // Sample descriptions for demo purposes
  const sampleDescriptions = [
    "A vibrant display with red and gold bursts choreographed to music",
    "Multi-color aerial shells creating a spectacular sky canvas",
    "Synchronized water and fire display for a corporate product launch",
    "Traditional wedding display with silver and white cascading effects",
    "High-intensity rapid-fire sequence for a national day celebration",
    "Low-noise specialty display designed for sensitive venues",
    "Colorful fountain display perfect for smaller celebration spaces",
    "Custom-shaped fireworks display featuring client's company logo",
    "Elegant gold and silver display for an upscale wedding reception",
    "Dynamic red and green display for a festive holiday event"
  ];
  
  try {
    // Path to gallery images
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');
    
    // Check if directory exists
    if (fs.existsSync(galleryDir)) {
      // Read all files from the gallery directory
      const imageFiles = fs.readdirSync(galleryDir);
      
      // Generate gallery items from image files
      galleryItems.push(...imageFiles
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map((file, index) => {
          // Get file extension
          const ext = path.extname(file);
          // Get file name without extension
          const name = path.basename(file, ext);
          
          // Categories for demo purposes
          const categories = ['weddings', 'corporate', 'special-events', 'national'];
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          
          // Random description
          const randomDescription = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
          
          return {
            id: index + 1,
            title: `Fireworks Display ${name.replace(/[0-9]/g, '')}`,
            category: randomCategory,
            thumbnail: `/images/gallery/${file}`,
            description: randomDescription
          };
        }));
    } else {
      // Directory doesn't exist, provide demo data
      console.log("Gallery directory not found. Using placeholder data instead.");
      
      // Demo data if no images are found
      const demoCategories = ['weddings', 'corporate', 'special-events', 'national'];
      for (let i = 1; i <= 20; i++) {
        const randomCategory = demoCategories[Math.floor(Math.random() * demoCategories.length)];
        const randomDescription = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
        
        galleryItems.push({
          id: i,
          title: `Fireworks Display ${i}`,
          category: randomCategory,
          thumbnail: `https://source.unsplash.com/random/800x600/?fireworks,${i}`,
          description: randomDescription
        });
      }
    }
  } catch (error) {
    console.error("Error reading gallery images:", error);
  }
  
  return {
    props: {
      galleryItems,
    },
  };
} 