'use client';

import React, { useState, useEffect } from 'react';
import PlantCareInfo from './PlantCareInfo';
import { FaUpload, FaLeaf, FaTrash, FaInfoCircle, FaCamera, FaSeedling, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ 
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

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
            className={`max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-10 ${roboto.className}`}
        >
            <h1 className="text-4xl font-bold text-center mb-10 text-green-800">
                <FaSeedling className="inline-block mr-3 text-green-600" />
                Plant Sage
            </h1>
            <motion.div 
                className={`mb-10 border-4 border-dashed rounded-2xl p-6 ${dragActive ? 'border-green-400 bg-green-50' : 'border-gray-300'} transition-all duration-300`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
                    <FaUpload className="w-12 h-12 text-green-500 mb-4" />
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
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition duration-300 disabled:opacity-50 text-xl font-semibold flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {loading ? (
                    <>
                        <FaSpinner className="animate-spin mr-3 h-6 w-6" />
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
                        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {plants.map((plant) => (
                            <motion.div 
                                key={plant.id} 
                                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={plant.preview} alt={`Plant`} className="w-full h-64 object-cover" />
                                <div className="p-8">
                                    {plant.result ? (
                                        <>
                                            <h2 className="text-2xl font-semibold mb-4 text-green-800">Plant Information:</h2>
                                            <div className="mb-6 text-gray-700 leading-relaxed">
                                                <p>{plant.result}</p>
                                            </div>
                                            <PlantCareInfo plantName={plant.result.split('\n')[0]} careInfo="Water regularly and place in bright, indirect sunlight." />
                                            <motion.button
                                                onClick={() => removePlant(plant.id)}
                                                className="mt-6 bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition duration-300 text-sm font-medium flex items-center justify-center shadow-md"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaTrash className="mr-2" />
                                                Remove Plant
                                            </motion.button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10">
                                            <FaLeaf className="text-4xl text-green-500 mb-4 animate-pulse" />
                                            <p className="text-gray-600 text-center text-lg font-medium">Awaiting identification...</p>
                                        </div>
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