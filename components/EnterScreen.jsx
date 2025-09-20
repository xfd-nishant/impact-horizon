import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import NatureSprite from "./NatureSprite";

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
      <LoadingScreen isLoading={isLoading} message="Loading Impact Horizon" />
      
      <main className="min-h-screen bg-forest-950 flex items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="particle-bg">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                animationDelay: `${Math.random() * 30}s`,
              }}
            />
          ))}
        </div>

        {/* Floating nature elements */}
        <div className="absolute inset-0 pointer-events-none">
          <NatureSprite type="oak" size="large" position="floating" className="absolute top-20 left-10" style={{ animationDelay: '0s' }} />
          <NatureSprite type="pine" size="medium" position="floating" className="absolute top-32 right-16" style={{ animationDelay: '2s' }} />
          <NatureSprite type="oak" size="xlarge" position="floating" className="absolute bottom-32 left-20" style={{ animationDelay: '4s' }} />
          <NatureSprite type="rose" size="small" position="floating" className="absolute top-40 left-1/4" style={{ animationDelay: '1s' }} />
          <NatureSprite type="robin" size="small" position="floating" className="absolute top-60 right-1/4" style={{ animationDelay: '3s' }} />
          <NatureSprite type="butterfly" size="small" position="floating" className="absolute bottom-40 left-1/3" style={{ animationDelay: '5s' }} />
          <NatureSprite type="cloud" size="medium" position="floating" className="absolute top-16 right-1/3" style={{ animationDelay: '1.5s' }} />
        </div>

        <motion.div 
          className="text-center px-6 max-w-2xl relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl font-display font-bold text-forest-100 mb-6 text-cyber-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            IMPACT HORIZON
          </motion.h1>

          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-transparent via-forest-500 to-transparent mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ delay: 0.5, duration: 1 }}
          ></motion.div>

          <motion.p 
            className="text-lg text-forest-200 mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Navigate complex environmental decisions, engage with stakeholders, 
            and explore the ripple effects of your choices.
          </motion.p>

          <motion.button
            onClick={handleEnterGame}
            className="btn-primary text-lg px-8 py-4 nature-glow"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(34, 197, 94, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Enter Simulation
          </motion.button>

          {/* Decorative elements */}
          <motion.div 
            className="mt-16 flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="w-2 h-2 bg-forest-400 rounded-full nature-pulse"></div>
            <div className="w-2 h-2 bg-forest-500 rounded-full nature-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-forest-600 rounded-full nature-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}