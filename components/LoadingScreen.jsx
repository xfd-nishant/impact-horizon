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
      className="fixed inset-0 bg-forest-950 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Simple spinner */}
        <div className="mb-8">
          <motion.div
            className="w-12 h-12 border-4 border-forest-700 border-t-forest-500 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Loading Text */}
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl font-semibold text-forest-200 mb-2"
        >
          {message}
          <span className="inline-block w-8 text-left">{dots}</span>
        </motion.h2>

        <p className="text-forest-400 text-sm">
          Please wait...
        </p>
      </div>
    </motion.div>
  );
}