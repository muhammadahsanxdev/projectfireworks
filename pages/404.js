import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout title="Page Not Found | Pakistan Super Fireworks">      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h1 className="text-7xl font-bold mb-4 text-white">404</h1>
          <h2 className="text-3xl font-bold mb-8 text-white">Page Not Found</h2>
          <p className="text-xl mb-10 text-gray-200">
            Oops! Looks like this page has vanished in a puff of smoke.
          </p>
          <Link href="/" className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 inline-block">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
} 