import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps, router }) {
  // Handle page view tracking for analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Add analytics tracking here if needed
      console.log(`Route changed to: ${url}`);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A modern, futuristic redesign of fireworkpk.com" />
        <meta name="keywords" content="Pakistan Super Fireworks, fireworks, pakistan, modern, website" />
      </Head>
      <ErrorBoundary>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ErrorBoundary>
    </>
  );
}

export default MyApp; 