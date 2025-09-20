import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NatureSprite from "./NatureSprite";

export default function LoadingScreen({ isLoading, message = "Loading..." }) {
  const [dots, setDots] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) return 100;
          return prev + Math.random() * 15;
        });
      }, 200);
      return () => clearInterval(progressInterval);
    } else {
      setLoadingProgress(0);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-forest-950 flex items-center justify-center z-50 relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="particle-bg">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              animationDelay: `${Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      {/* Floating nature elements */}
      <div className="absolute inset-0 pointer-events-none">
        <NatureSprite type="tree" size="small" position="floating" className="absolute top-20 left-20" />
        <NatureSprite type="flower" size="small" position="floating" className="absolute top-40 right-20" />
        <NatureSprite type="bird" size="small" position="floating" className="absolute bottom-40 left-1/4" />
        <NatureSprite type="butterfly" size="small" position="floating" className="absolute bottom-20 right-1/3" />
      </div>

      <div className="text-center relative z-10">
        {/* Enhanced spinner with nature theme */}
        <div className="mb-8 relative">
          <motion.div
            className="w-16 h-16 border-4 border-forest-700 border-t-forest-500 rounded-full mx-auto relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <NatureSprite type="leaf" size="small" position="pulsing" />
            </div>
          </motion.div>
          
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 w-16 h-16 border-2 border-forest-400 rounded-full mx-auto"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-forest-800 rounded-full mx-auto mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-forest-500 to-forest-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Loading Text */}
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl font-semibold text-forest-100 mb-2 text-nature-glow"
        >
          {message}
          <span className="inline-block w-8 text-left">{dots}</span>
        </motion.h2>

        <p className="text-forest-300 text-sm mb-4">
          Preparing your environmental simulation...
        </p>

        {/* Loading percentage */}
        <motion.div
          className="text-forest-400 text-sm font-mono"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {Math.round(loadingProgress)}%
        </motion.div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-2 mt-6">
          <motion.div
            className="w-2 h-2 bg-forest-500 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-forest-500 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-forest-500 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}