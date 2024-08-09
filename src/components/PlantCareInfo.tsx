'use client';

import React, { useState } from 'react';
import { FaLeaf, FaWater, FaSun, FaThermometerHalf, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface PlantCareInfoProps {
    plantName: string;
    careInfo: string;
}

export default function PlantCareInfo({ plantName, careInfo }: PlantCareInfoProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <motion.div 
            className={`bg-white rounded-xl shadow-lg p-6 mt-8 w-full max-w-3xl mx-auto border border-green-100 ${inter.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <FaLeaf className="mr-3 text-green-600" />
                Care Guide for {plantName}
            </h3>
            <AnimatePresence>
                <motion.div 
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: expanded ? 'auto' : '150px' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg">
                            <FaWater className="text-blue-500 text-2xl mb-2" />
                            <span className="text-sm font-medium text-gray-700">Water: Regular</span>
                        </div>
                        <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg">
                            <FaSun className="text-yellow-500 text-2xl mb-2" />
                            <span className="text-sm font-medium text-gray-700">Light: Indirect</span>
                        </div>
                        <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg">
                            <FaThermometerHalf className="text-red-500 text-2xl mb-2" />
                            <span className="text-sm font-medium text-gray-700">Temp: 65-75°F</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-base leading-relaxed">{careInfo}</p>
                </motion.div>
            </AnimatePresence>
            <motion.button 
                onClick={toggleExpand}
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300 text-sm font-semibold flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {expanded ? (
                    <>
                        Show Less <FaChevronUp className="ml-2" />
                    </>
                ) : (
                    <>
                        Show More <FaChevronDown className="ml-2" />
                    </>
                )}
            </motion.button>
        </motion.div>
    );
}