import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

// Optimized animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  const [formErrors, setFormErrors] = useState({});

  // Section style for better text readability
  const sectionStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '0.5rem',
    padding: '2rem',
    backdropFilter: 'blur(5px)'
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject) {
      errors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Use callback to prevent recreation of function on each render
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [formErrors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      // Formspree endpoint
      const formspreeId = 'mzzrzraz'; 
      const formAction = `https://formspree.io/f/${formspreeId}`;
      
      const response = await fetch(formAction, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: formData.subject,
          message: formData.message,
          _subject: `New contact from ${formData.name}: ${formData.subject}`
        })
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        // If the server responds with an error
        const data = await response.json();
        throw new Error(data.error || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  }, [formData, validateForm]);

  return (
    <Layout
      title="Contact Us | Pakistan Super FireWorks"
      description="Get in touch with Pakistan's leading fireworks company. Contact us for all your event needs."
      keywords="contact fireworks pakistan, fireworks contact, event fireworks contact, wedding fireworks contact"
    >
      <Head>
        <title>Contact Us - Pakistan Super Fireworks</title>
        <meta name="description" content="Get in touch with Pakistan Super FireWorks for custom fireworks displays, quotes, and information. We serve all major cities across Pakistan." />
      </Head>
      
      {/* Main Content */}
      <div className="relative z-10 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact <span className="gradient-text">Us</span></h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                We&apos;d love to hear from you! Reach out to us for any questions or to discuss your fireworks needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div style={sectionStyle}>
                <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
                
                {formStatus === 'success' ? (
                  <div className="bg-green-600 bg-opacity-20 border border-green-500 text-green-100 rounded-md p-4 mb-6">
                    <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                    <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
                  </div>
                ) : formStatus === 'error' ? (
                  <div className="bg-red-600 bg-opacity-20 border border-red-500 text-red-100 rounded-md p-4 mb-6">
                    <h3 className="text-xl font-medium mb-2">Something went wrong</h3>
                    <p>We couldn't send your message. Please try again or contact us directly.</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={formStatus === 'submitting'}
                      className={`w-full px-4 py-2 bg-gray-800 bg-opacity-50 border ${
                        formErrors.name ? 'border-red-500' : 'border-gray-600'
                      } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={formStatus === 'submitting'}
                      className={`w-full px-4 py-2 bg-gray-800 bg-opacity-50 border ${
                        formErrors.email ? 'border-red-500' : 'border-gray-600'
                      } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      placeholder="Your email"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={formStatus === 'submitting'}
                      className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-1">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={formStatus === 'submitting'}
                      className={`w-full px-4 py-2 bg-gray-800 bg-opacity-50 border ${
                        formErrors.subject ? 'border-red-500' : 'border-gray-600'
                      } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="event">Event Planning</option>
                      <option value="product">Product Information</option>
                      <option value="support">Customer Support</option>
                    </select>
                    {formErrors.subject && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={formStatus === 'submitting'}
                      className={`w-full px-4 py-2 bg-gray-800 bg-opacity-50 border ${
                        formErrors.message ? 'border-red-500' : 'border-gray-600'
                      } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      placeholder="Your message"
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full px-6 py-3 ${
                      formStatus === 'submitting'
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-600 to-orange-500 hover:shadow-lg'
                    } text-white font-medium rounded-md transition-all duration-200`}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div>
                <div style={sectionStyle} className="mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gradient-to-r from-red-600 to-orange-500 p-3 rounded-md mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                        <p className="text-gray-300">+92 321 8255297</p>
                        <p className="text-gray-300">+92 333 2388055</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gradient-to-r from-red-600 to-orange-500 p-3 rounded-md mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                        <p className="text-gray-300">sms.bpl68@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gradient-to-r from-red-600 to-orange-500 p-3 rounded-md mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Address</h3>
                        <p className="text-gray-300">B-11 Block H North Nazimabad, Karachi, Pakistan</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={sectionStyle}>
                  <h2 className="text-2xl font-bold mb-6 text-white">Operating Hours</h2>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-300">Monday - Friday:</span>
                      <span className="text-white">9:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Saturday:</span>
                      <span className="text-white">10:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Sunday:</span>
                      <span className="text-white">Closed</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-gray-400 text-sm">
                    * Hours may vary during peak season and holidays
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

// Add getStaticProps for better performance
export async function getStaticProps() {
  return {
    props: {},
    // Revalidate once per day
    revalidate: 86400
  };
} 