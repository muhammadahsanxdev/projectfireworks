import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - Pakistan Super FireWorks</title>
        <meta name="description" content="Our privacy policy outlines how we collect, use, and protect your information when you use our website or services." />
      </Head>
      
      {/* Main Content */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto section-bg-dark p-8 rounded-lg"
          >
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Privacy Policy</h1>
              <p className="text-gray-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                Thank you for choosing Pakistan Super FireWorks. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when you express interest in obtaining information about us or our products and services when you participate in activities on the website or otherwise when you contact us.
              </p>
              <p>
                The personal information we collect may include:
              </p>
              <ul>
                <li>Name and contact information (email address, phone number)</li>
                <li>Billing and payment information</li>
                <li>Event details and preferences</li>
                <li>Feedback and correspondence (surveys, messages)</li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul>
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve and personalize your experience</li>
                <li>Understand how you use our website</li>
                <li>Develop new products, services, and features</li>
                <li>Communicate with you about our services, updates, and other information</li>
                <li>Process your transactions</li>
                <li>Prevent fraud and enforce our legal terms</li>
              </ul>
              
              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We may use cookies and similar tracking technologies to access or store information. These technologies help us understand user behavior, remember your preferences, and improve your experience.
              </p>
              
              <h2>Third-Party Services</h2>
              <p>
                We may use third-party services that collect, monitor, and analyze data to improve our service's functionality. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
              
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
              </p>
              
              <h2>Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.
              </p>
              
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about our Privacy Policy or data practices, please contact us:
              </p>
              <p>
                Email: sms.bpl68@gmail.com<br />
                Phone: +92 321 8255297, +92 333 2388055
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <Link href="/" className="text-primary-500 hover:underline">
                &larr; Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 