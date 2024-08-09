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
            className="bg-white rounded-lg shadow-md p-4 mt-6 w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLeaf className="mr-2 text-green-600" />
                Care Guide for {plantName}
            </h3>
            <AnimatePresence>
                <motion.div 
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: expanded ? 'auto' : '120px' }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center bg-gray-50 p-2 rounded">
                            <FaWater className="text-blue-500 mr-2" />
                            <span className="text-sm text-gray-700">Water: Regular</span>
                        </div>
                        <div className="flex items-center bg-gray-50 p-2 rounded">
                            <FaSun className="text-yellow-500 mr-2" />
                            <span className="text-sm text-gray-700">Light: Indirect</span>
                        </div>
                        <div className="flex items-center bg-gray-50 p-2 rounded">
                            <FaThermometerHalf className="text-red-500 mr-2" />
                            <span className="text-sm text-gray-700">Temp: 65-75°F</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{careInfo}</p>
                </motion.div>
            </AnimatePresence>
            <button 
                onClick={toggleExpand}
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 text-sm font-medium flex items-center justify-center"
            >
                {expanded ? (
                    <>
                        Show Less <FaChevronUp className="ml-1" />
                    </>
                ) : (
                    <>
                        Show More <FaChevronDown className="ml-1" />
                    </>
                )}
            </button>
        </motion.div>
    );
}