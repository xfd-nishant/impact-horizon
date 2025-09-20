import scenarios from "../data/scenarios.json";
import ScenarioCard from "./ScenarioCard";
import NatureSprite from "./NatureSprite";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ScenarioDashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, type: "spring" }
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} message="Loading Scenarios" />
      
      <div className="min-h-screen bg-forest-950 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="particle-bg">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 25}s`,
              }}
            />
          ))}
        </div>

        {/* Floating nature elements */}
        <div className="absolute inset-0 pointer-events-none">
          <NatureSprite type="tree" size="large" position="floating" className="absolute top-20 left-10" />
          <NatureSprite type="flower" size="medium" position="floating" className="absolute top-40 right-16" />
          <NatureSprite type="bird" size="small" position="floating" className="absolute top-60 left-1/4" />
          <NatureSprite type="butterfly" size="small" position="floating" className="absolute bottom-40 right-1/4" />
          <NatureSprite type="cloud" size="medium" position="floating" className="absolute top-16 right-1/3" />
          <NatureSprite type="leaf" size="small" position="floating" className="absolute bottom-60 left-1/3" />
        </div>

        <motion.main 
          className="min-h-screen relative z-10"
          variants={containerVariants}
          initial="hidden" 
          animate="visible"
        >
          {/* Header */}
          <motion.header 
            className="bg-forest-900/90 backdrop-blur-lg border-b border-forest-600 py-16 relative"
            variants={titleVariants}
          >
            <div className="max-w-6xl mx-auto px-8 text-center">
              <h1 className="text-4xl font-display font-bold text-forest-100 mb-4 text-nature-glow">
                Select Scenario
              </h1>
              <p className="text-lg text-forest-200 max-w-2xl mx-auto">
                Choose an environmental scenario to explore complex decision-making challenges.
              </p>
              
              {/* Decorative nature elements in header */}
              <div className="flex justify-center space-x-8 mt-8">
                <NatureSprite type="tree" size="small" position="pulsing" />
                <NatureSprite type="flower" size="small" position="pulsing" />
                <NatureSprite type="bird" size="small" position="pulsing" />
              </div>
            </div>
          </motion.header>

          {/* Scenarios Grid */}
          <motion.section 
            className="max-w-7xl mx-auto px-8 py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-forest-100 mb-4 text-nature-glow">
                Available Simulations
              </h2>
              <p className="text-lg text-forest-200 font-nature max-w-2xl mx-auto">
                Select a scenario to begin your journey into complex environmental decision-making
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <ScenarioCard scenario={scenario} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action Footer */}
          <motion.footer 
            className="bg-gradient-to-r from-forest-900/90 to-forest-800/90 backdrop-blur-lg py-16 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="max-w-4xl mx-auto text-center px-8">
              <div className="flex justify-center space-x-4 mb-6">
                <NatureSprite type="tree" size="medium" position="glowing" />
                <NatureSprite type="flower" size="medium" position="glowing" />
                <NatureSprite type="bird" size="medium" position="glowing" />
                <NatureSprite type="butterfly" size="medium" position="glowing" />
              </div>
              <h3 className="text-2xl font-display font-bold text-forest-100 mb-4 text-nature-glow">
                Ready to Make an Impact?
              </h3>
              <p className="text-forest-200 font-nature text-lg mb-6">
                Your decisions in these scenarios mirror real-world environmental challenges. 
                Learn, explore, and discover the interconnected nature of our planet's systems.
              </p>
              <div className="text-sm text-forest-300 italic">
                💡 Each scenario offers unique stakeholders, challenges, and learning opportunities
              </div>
            </div>
          </motion.footer>
        </motion.main>
      </div>
    </>
  );
}