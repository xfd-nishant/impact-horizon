import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function EnterScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnterGame = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} message="Loading Impact Sandbox" />
      
      <main className="min-h-screen bg-forest-950 flex items-center justify-center">
        <motion.div 
          className="text-center px-6 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl font-display font-bold text-forest-100 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Impact Sandbox
          </motion.h1>

          <motion.p 
            className="text-lg text-forest-300 mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Navigate complex environmental decisions, engage with stakeholders, 
            and explore the ripple effects of your choices.
          </motion.p>

          <motion.button
            onClick={handleEnterGame}
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Enter Simulation
          </motion.button>
        </motion.div>
      </main>
    </>
  );
}