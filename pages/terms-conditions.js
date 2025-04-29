import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

export default function TermsConditions() {
  return (
    <Layout>
      <Head>
        <title>Terms & Conditions - Pakistan Super FireWorks</title>
        <meta name="description" content="Read our terms and conditions for using Pakistan Super FireWorks services, products, and website." />
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Terms and Conditions</h1>
              <p className="text-gray-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                Please read these terms and conditions carefully before using our website or services. By accessing our website or using our services, you agree to be bound by these terms and conditions.
              </p>
              
              <h2>Use of Our Services</h2>
              <p>
                Pakistan Super FireWorks provides professional fireworks display services for various events. By engaging our services, you agree to:
              </p>
              <ul>
                <li>Provide accurate and complete information regarding your event</li>
                <li>Comply with all safety guidelines provided by our team</li>
                <li>Obtain necessary permits or permissions required for fireworks displays at your venue</li>
                <li>Follow payment terms as specified in your service agreement</li>
              </ul>
              
              <h2>Booking and Cancellation</h2>
              <p>
                Bookings are confirmed upon receipt of a deposit payment. Cancellation policies are as follows:
              </p>
              <ul>
                <li>Cancellations made 30 days or more before the event date: 75% of deposit refunded</li>
                <li>Cancellations made 15-29 days before the event date: 50% of deposit refunded</li>
                <li>Cancellations made 7-14 days before the event date: 25% of deposit refunded</li>
                <li>Cancellations made less than 7 days before the event date: No refund</li>
              </ul>
              <p>
                In the event of extreme weather conditions that make a fireworks display unsafe, we will attempt to reschedule at no additional cost, or provide a partial refund as determined on a case-by-case basis.
              </p>
              
              <h2>Safety and Compliance</h2>
              <p>
                Safety is our primary concern. We reserve the right to modify or cancel a fireworks display if:
              </p>
              <ul>
                <li>Weather conditions pose a safety risk</li>
                <li>The venue does not meet safety requirements</li>
                <li>Required permits are not obtained</li>
                <li>Any situation arises that our team determines poses a safety risk</li>
              </ul>
              
              <h2>Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, images, videos, and software, is the property of Pakistan Super FireWorks and is protected by copyright and other intellectual property laws.
              </p>
              <p>
                We may photograph or record video of our fireworks displays at your event. By booking our services, you grant us permission to use these materials for promotional purposes, unless explicitly agreed otherwise in writing.
              </p>
              
              <h2>Limitation of Liability</h2>
              <p>
                Pakistan Super FireWorks shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or any fireworks display performed by us.
              </p>
              <p>
                Our liability is limited to the amount paid for the specific services related to your event.
              </p>
              
              <h2>Website Use</h2>
              <p>
                You may use our website for lawful purposes only. You must not:
              </p>
              <ul>
                <li>Use the website in any way that causes damage to the website or impairs its availability</li>
                <li>Use the website for any fraudulent or illegal purpose</li>
                <li>Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
              </ul>
              
              <h2>Changes to Terms</h2>
              <p>
                We may revise these terms and conditions at any time. By continuing to use our website or services after changes are made, you agree to be bound by the revised terms.
              </p>
              
              <h2>Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you submit to the exclusive jurisdiction of the courts located in Pakistan.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about our terms and conditions, please contact us:
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