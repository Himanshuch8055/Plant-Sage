'use client';

import { useState, useEffect } from 'react';
import PlantIdentifier from '@/components/PlantIdentifier';
import { FaLeaf, FaGithub, FaSeedling, FaTree, FaExternalLinkAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex flex-col">
      <header className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold flex items-center">
            <FaLeaf className="mr-2 text-yellow-300" />
            Plant Sage
          </h1>
          <nav>
            <a href="#about" className="text-sm text-white hover:text-yellow-300 transition-colors mr-3">About</a>
            <a href="#contact" className="text-sm text-white hover:text-yellow-300 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-teal-800 mb-3">Discover and Learn About Plants with AI</h2>
          <p className="text-base text-teal-700 max-w-xl mx-auto">
            Explore plants with AI. Upload an image to identify and get care tips.
          </p>
        </MotionDiv>
        <PlantIdentifier />
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <FaSeedling className="text-3xl text-teal-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-teal-700">Instant Identification</h3>
            <p className="text-sm text-gray-600">AI recognizes thousands of plant species from your photos.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <FaTree className="text-3xl text-emerald-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-emerald-700">Expert Care Tips</h3>
            <p className="text-sm text-gray-600">Get tailored advice on nurturing your identified plants.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <FaLeaf className="text-3xl text-yellow-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2 text-yellow-700">Learn and Explore</h3>
            <p className="text-sm text-gray-600">Discover facts about various plant species.</p>
          </div>
        </MotionDiv>
      </main>

      <footer className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0">
            <h3 className="text-xl font-semibold mb-1">Plant Sage</h3>
            <p className="text-xs">Empowering plant enthusiasts with AI-driven insights.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <a href="#" className="text-sm hover:text-yellow-300 transition-colors mb-2 md:mb-0 md:mr-4">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-yellow-300 transition-colors mb-2 md:mb-0 md:mr-4">Terms of Service</a>
            <a
              href="https://github.com/himanshuch8055/plant-identifier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center hover:text-yellow-300 transition-colors mb-2 md:mb-0 md:mr-4"
            >
              <FaGithub className="mr-1" />
              View on GitHub
            </a>
            <a
              href="https://plant-identifiers.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center hover:text-yellow-300 transition-colors"
            >
              <FaExternalLinkAlt className="mr-1" />
              Live Demo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}