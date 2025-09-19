import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ isLoading, message = "Loading..." }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-forest-gradient flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Animated Nature Elements */}
        <div className="relative mb-8">
          {/* Central Tree */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 mx-auto mb-4 relative"
          >
            <div className="absolute inset-0 bg-earth-600 rounded-full w-8 h-8 bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-earth-700 rounded-t-lg"></div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-forest-500 rounded-full"
            ></motion.div>
          </div>

          {/* Floating Leaves */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute loading-leaf"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Water Droplets */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`water-${i}`}
              className="absolute w-3 h-3 bg-water-400 rounded-full"
              style={{
                left: `${60 + i * 10}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                y: [0, 30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-3xl font-display font-bold text-white mb-4 text-glow"
        >
          {message}
          <span className="inline-block w-8 text-left">{dots}</span>
        </motion.h2>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-forest-300 to-forest-500 rounded-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Subtitle */}
        <p className="text-forest-100 mt-4 font-nature">
          Preparing your environmental impact simulation...
        </p>
      </div>
    </motion.div>
  );
}