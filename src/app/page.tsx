'use client';

import { useState, useEffect } from 'react';
import PlantIdentifier from '@/components/PlantIdentifier';
import { FaLeaf, FaGithub } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <FaLeaf className="mr-2" />
            Plant Identifier
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-2">Discover and learn about plants with AI</h2>
        </MotionDiv>
        <PlantIdentifier />
      </main>

      <footer className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>© 2024 Plant Identifier. All rights reserved.</p>
          <a
            href="https://github.com/himanshuch8055/plant-identifier"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-green-200 transition-colors"
          >
            <FaGithub className="mr-2" />
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}