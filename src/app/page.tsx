'use client';

import { useState, useEffect } from 'react';
import PlantIdentifier from '@/components/PlantIdentifier';
import { FaLeaf, FaGithub, FaSeedling, FaTree, FaExternalLinkAlt, FaInfoCircle, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import Head from 'next/head';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${roboto.className} min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex flex-col`}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#14B8A6" />
      </Head>
      <header className="bg-white text-teal-800 py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold flex items-center">
            <FaLeaf className="mr-2 text-teal-600" />
            Plant Sage
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-sm font-medium hover:text-teal-600 transition-colors">About</Link>
            <Link href="#features" className="text-sm font-medium hover:text-teal-600 transition-colors">Features</Link>
            <Link href="#contact" className="text-sm font-medium hover:text-teal-600 transition-colors">Contact</Link>
            <Link href="#" className="text-sm font-medium bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors">Get Started</Link>
          </nav>
          <button onClick={toggleMenu} className="md:hidden text-teal-800 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white">
            <Link href="#about" className="block py-2 px-4 text-sm hover:bg-teal-100">About</Link>
            <Link href="#features" className="block py-2 px-4 text-sm hover:bg-teal-100">Features</Link>
            <Link href="#contact" className="block py-2 px-4 text-sm hover:bg-teal-100">Contact</Link>
            <Link href="#" className="block py-2 px-4 text-sm bg-teal-600 text-white mt-2">Get Started</Link>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto p-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-teal-800 mb-4">Discover and Learn About Plants with AI</h2>
          <p className="text-xl text-teal-700 max-w-2xl mx-auto">
            Explore the world of plants with cutting-edge AI technology. Upload an image to identify species and get expert care tips.
          </p>
        </MotionDiv>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-16">
          <div className="p-8">
            <PlantIdentifier />
          </div>
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          id="features"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaSeedling className="text-5xl text-teal-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-teal-700">Instant Identification</h3>
            <p className="text-gray-600">Our advanced AI recognizes thousands of plant species from your photos with high accuracy.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaTree className="text-5xl text-emerald-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-emerald-700">Expert Care Tips</h3>
            <p className="text-gray-600">Get personalized advice on nurturing your identified plants for optimal growth and health.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaLeaf className="text-5xl text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-yellow-700">Learn and Explore</h3>
            <p className="text-gray-600">Discover fascinating facts about various plant species and expand your botanical knowledge.</p>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 bg-white rounded-xl shadow-2xl overflow-hidden"
          id="about"
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h3 className="text-3xl font-bold text-teal-800 mb-4">About Plant Sage</h3>
              <p className="text-gray-600 mb-4">
                Plant Sage is your intelligent companion in the world of botany. Our mission is to make plant identification and care accessible to everyone, from seasoned gardeners to curious nature enthusiasts.
              </p>
              <p className="text-gray-600">
                With state-of-the-art AI technology, we provide accurate plant identification, tailored care instructions, and a wealth of botanical knowledge at your fingertips.
              </p>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Various plants in a greenhouse"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </MotionDiv>
      </main>

      <footer className="bg-teal-800 text-white py-16" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <FaLeaf className="mr-2 text-teal-300" />
                Plant Sage
              </h3>
              <p className="text-sm text-teal-200 leading-relaxed">Empowering plant enthusiasts with AI-driven insights. Our mission is to connect people with nature through technology.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-300">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="hover:text-teal-300 transition-colors text-sm flex items-center"><FaExternalLinkAlt className="mr-2 text-xs" />Home</Link></li>
                <li><Link href="#about" className="hover:text-teal-300 transition-colors text-sm flex items-center"><FaExternalLinkAlt className="mr-2 text-xs" />About</Link></li>
                <li><Link href="#features" className="hover:text-teal-300 transition-colors text-sm flex items-center"><FaExternalLinkAlt className="mr-2 text-xs" />Features</Link></li>
                <li><Link href="#" className="hover:text-teal-300 transition-colors text-sm flex items-center"><FaExternalLinkAlt className="mr-2 text-xs" />Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-300">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="hover:text-teal-300 transition-colors text-sm flex items-center"><FaInfoCircle className="mr-2" />Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-teal-300 transition-colors text-sm flex items-center"><FaInfoCircle className="mr-2" />Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-teal-300 transition-colors text-sm flex items-center"><FaInfoCircle className="mr-2" />Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-300">Connect with Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/himanshuch8055/plant-sage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-teal-300 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a 
                  href="https://www.linkedin.com/in/himanshuch8055/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-teal-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="mailto:himanshuch8055@gmail.com" 
                  className="text-2xl hover:text-teal-300 transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
                <a 
                  href="https://twitter.com/himanshuch8055" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-teal-300 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
              <p className="mt-4 text-sm text-teal-200">Stay connected for updates and botanical insights.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-teal-700 text-center">
            <p className="text-sm text-teal-300">&copy; {new Date().getFullYear()} Plant Sage. All rights reserved.</p>
            <p className="mt-2 text-xs text-teal-400">Designed and developed with 🌱 for plant lovers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}