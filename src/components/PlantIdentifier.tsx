'use client';

import React, { useState, useEffect } from 'react';
import PlantCareInfo from './PlantCareInfo';
import { FaUpload, FaLeaf, FaTrash, FaInfoCircle, FaCamera } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface PlantInfo {
    id: string;
    file: File;
    preview: string;
    result: string | null;
}

export default function PlantIdentifier() {
    const [plants, setPlants] = useState<PlantInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        return () => {
            plants.forEach(plant => URL.revokeObjectURL(plant.preview));
        };
    }, [plants]);

    const handleImageUpload = (files: FileList) => {
        const newPlants = Array.from(files).map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: URL.createObjectURL(file),
            result: null
        }));
        setPlants(prevPlants => [...prevPlants, ...newPlants]);
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files);
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const identifyPlants = async () => {
        setLoading(true);
        const updatedPlants = await Promise.all(plants.map(async (plant) => {
            if (plant.result) return plant;

            try {
                const base64Image = await fileToBase64(plant.file);
                const base64Data = base64Image.split(',')[1];

                const response = await fetch('/api/gemini', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64Data }),
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                return { ...plant, result: data.result };
            } catch (error) {
                console.error('Error identifying plant:', error);
                return { ...plant, result: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
            }
        }));

        setPlants(updatedPlants);
        setLoading(false);
    };

    const removePlant = (id: string) => {
        setPlants(prevPlants => prevPlants.filter(plant => plant.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-green-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FaLeaf className="inline-block mr-2 mb-1" />
                Plant Identifier
            </motion.h1>
            <div 
                className={`mb-6 border-2 rounded-lg ${dragActive ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-40 sm:h-48 md:h-56 px-4 transition bg-white rounded-lg appearance-none cursor-pointer hover:bg-green-50 focus:outline-none">
                    <span className="flex items-center space-x-2 mb-2">
                        <FaUpload className="w-6 h-6 text-green-600" />
                        <span className="font-medium text-gray-600">
                            Drop files to Attach, or
                            <span className="text-green-600 underline ml-1">browse</span>
                        </span>
                    </span>
                    <p className="text-sm text-gray-500 flex items-center">
                        <FaInfoCircle className="mr-1 text-green-500" />
                        You can add multiple images for identification
                    </p>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        multiple
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                        className="hidden"
                    />
                </label>
            </div>
            <motion.button
                onClick={identifyPlants}
                disabled={plants.length === 0 || loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 text-lg font-semibold flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Identifying...
                    </>
                ) : (
                    <>
                        <FaCamera className="mr-2" />
                        Identify Plants
                    </>
                )}
            </motion.button>
            <AnimatePresence>
                <motion.div 
                    className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {plants.map((plant) => (
                        <motion.div 
                            key={plant.id} 
                            className="bg-green-50 rounded-lg shadow-md overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={plant.preview} alt={`Plant`} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                            <div className="p-4">
                                {plant.result ? (
                                    <>
                                        <h2 className="text-xl font-semibold mb-2 text-green-800">Plant Information:</h2>
                                        <div className="max-h-40 overflow-y-auto mb-4">
                                            <p className="text-gray-700 whitespace-pre-wrap">{plant.result}</p>
                                        </div>
                                        <PlantCareInfo plantName={plant.result.split('\n')[0]} careInfo="Water regularly and place in bright, indirect sunlight." />
                                        <motion.button
                                            onClick={() => removePlant(plant.id)}
                                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center w-full"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaTrash className="mr-2" />
                                            Remove
                                        </motion.button>
                                    </>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Waiting for identification...</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}