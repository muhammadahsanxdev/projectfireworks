import Head from 'next/head';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';

// Dynamically import components for better performance
// Make Header and Footer client-side only to prevent hydration errors
const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });
const BackgroundSlideshow = dynamic(() => import('./BackgroundSlideshow'), { ssr: false });

const Layout = ({ 
  children, 
  title = 'Pakistan Super FireWorks | Pakistan\'s Biggest Digital Fire Works And Pyro Technical Company',
  description = 'Pakistan\'s Biggest Digital Fire Works Company providing professional displays for weddings, corporate events, and celebrations across Islamabad, Lahore, Karachi and nationwide.',
  keywords = 'fireworks pakistan, wedding fireworks, event fireworks, firework display, fireworks in islamabad, fireworks in lahore, digital fireworks'
}) => {
  // Optimized animation settings
  const mainAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ff4800" />
        {/* Add preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add preload for critical resources */}
        <link rel="preload" href="/images/logo.png" as="image" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <BackgroundSlideshow />
        <Header />
        
        <motion.main 
          className="flex-grow"
          initial={mainAnimation.initial}
          animate={mainAnimation.animate}
          transition={mainAnimation.transition}
        >
          {children}
        </motion.main>
        
        <Footer />
      </div>
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(Layout); 