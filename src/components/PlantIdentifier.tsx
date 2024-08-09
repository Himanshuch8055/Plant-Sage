'use client';

import React, { useState, useEffect } from 'react';
import PlantCareInfo from './PlantCareInfo';
import { FaUpload, FaLeaf, FaTrash, FaInfoCircle, FaCamera, FaSeedling } from 'react-icons/fa';
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
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8"
        >
            <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
                <FaSeedling className="inline-block mr-3 text-green-600" />
                Plant Sage
            </h1>
            <motion.div 
                className={`mb-8 border-3 border-dashed rounded-xl p-6 ${dragActive ? 'border-green-400 bg-green-50' : 'border-gray-300'} transition-all duration-300`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-40 cursor-pointer">
                    <FaUpload className="w-10 h-10 text-green-500 mb-4" />
                    <span className="text-lg font-medium text-gray-700">
                        Drop files to attach, or <span className="text-green-600 underline">browse</span>
                    </span>
                    <p className="mt-2 text-sm text-gray-500">Supported formats: JPG, PNG, GIF</p>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        multiple
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                        className="hidden"
                    />
                </label>
            </motion.div>
            <motion.button
                onClick={identifyPlants}
                disabled={plants.length === 0 || loading}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50 text-lg font-semibold flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Identifying Plants...
                    </>
                ) : (
                    <>
                        <FaCamera className="mr-3" />
                        Identify Plants
                    </>
                )}
            </motion.button>
            <AnimatePresence>
                {plants.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {plants.map((plant) => (
                            <motion.div 
                                key={plant.id} 
                                className="bg-gray-50 rounded-xl overflow-hidden shadow-md border border-gray-200"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={plant.preview} alt={`Plant`} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    {plant.result ? (
                                        <>
                                            <h2 className="text-xl font-semibold mb-3 text-green-700">Plant Information:</h2>
                                            <div className="mb-4 text-gray-700 leading-relaxed">
                                                <p>{plant.result}</p>
                                            </div>
                                            <PlantCareInfo plantName={plant.result.split('\n')[0]} careInfo="Water regularly and place in bright, indirect sunlight." />
                                            <motion.button
                                                onClick={() => removePlant(plant.id)}
                                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 text-sm font-medium flex items-center justify-center shadow-sm"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaTrash className="mr-2" />
                                                Remove Plant
                                            </motion.button>
                                        </>
                                    ) : (
                                        <p className="text-gray-600 text-center py-6 text-lg">Awaiting identification...</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}