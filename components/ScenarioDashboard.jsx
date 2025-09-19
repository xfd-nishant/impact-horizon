import scenarios from "../data/scenarios.json";
import ScenarioCard from "./ScenarioCard";
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
      
      <div className="min-h-screen bg-forest-950">

        <motion.main 
          className="min-h-screen relative z-10"
          variants={containerVariants}
          initial="hidden" 
          animate="visible"
        >
          {/* Header */}
          <motion.header 
            className="bg-forest-900 border-b border-forest-700 py-16"
            variants={titleVariants}
          >
            <div className="max-w-6xl mx-auto px-8 text-center">
              <h1 className="text-4xl font-display font-bold text-forest-100 mb-4">
                Select Scenario
              </h1>
              <p className="text-lg text-forest-300 max-w-2xl mx-auto">
                Choose an environmental scenario to explore complex decision-making challenges.
              </p>
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
              <h2 className="text-3xl font-display font-bold text-forest-900 mb-4">
                Available Simulations
              </h2>
              <p className="text-lg text-forest-700 font-nature max-w-2xl mx-auto">
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
            className="bg-gradient-to-r from-forest-50 to-water-50 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="max-w-4xl mx-auto text-center px-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-display font-bold text-forest-900 mb-4">
                Ready to Make an Impact?
              </h3>
              <p className="text-forest-700 font-nature text-lg mb-6">
                Your decisions in these scenarios mirror real-world environmental challenges. 
                Learn, explore, and discover the interconnected nature of our planet's systems.
              </p>
              <div className="text-sm text-forest-600 italic">
                💡 Each scenario offers unique stakeholders, challenges, and learning opportunities
              </div>
            </div>
          </motion.footer>
        </motion.main>
      </div>
    </>
  );
}