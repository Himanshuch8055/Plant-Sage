'use client';

import React, { useState } from 'react';
import { FaLeaf, FaWater, FaSun, FaThermometerHalf, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface PlantCareInfoProps {
    plantName: string;
    careInfo: string;
}

export default function PlantCareInfo({ plantName, careInfo }: PlantCareInfoProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <motion.div 
            className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-md p-4 sm:p-6 mt-4 transition-all duration-300 hover:shadow-lg w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 flex items-center justify-center sm:justify-start">
                <FaLeaf className="mr-3 text-green-600" />
                Care Guide for {plantName}
            </h3>
            <AnimatePresence>
                <motion.div 
                    className={`overflow-hidden`}
                    initial={false}
                    animate={{ height: expanded ? 'auto' : '100px' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                            <FaWater className="text-blue-500 mr-3 text-2xl" />
                            <span className="text-gray-700 text-lg">Water: Regularly</span>
                        </div>
                        <div className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                            <FaSun className="text-yellow-500 mr-3 text-2xl" />
                            <span className="text-gray-700 text-lg">Light: Bright, indirect</span>
                        </div>
                        <div className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                            <FaThermometerHalf className="text-red-500 mr-3 text-2xl" />
                            <span className="text-gray-700 text-lg">Temperature: 65-75°F</span>
                        </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">{careInfo}</p>
                </motion.div>
            </AnimatePresence>
            <motion.button 
                onClick={toggleExpand}
                className="mt-6 w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 font-semibold flex items-center justify-center text-lg"
                whileHover={{ scale: 1.03 }}
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