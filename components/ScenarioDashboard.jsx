import scenarios from "../data/scenarios.json";
import ScenarioCard from "./ScenarioCard";
import LockedScenarioCard from "./LockedScenarioCard";
import NatureSprite from "./NatureSprite";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ScenarioDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Split scenarios into sections of 3
  const unlockedScenarios = scenarios.filter(s => s.unlocked);
  const lockedScenarios = scenarios.filter(s => !s.unlocked);
  const allScenarios = [...unlockedScenarios, ...lockedScenarios];
  const sections = [];
  for (let i = 0; i < allScenarios.length; i += 3) {
    sections.push(allScenarios.slice(i, i + 3));
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSection(Math.max(0, currentSection - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentSection(Math.min(sections.length - 1, currentSection + 1));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, sections.length]);

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
          <NatureSprite type="oak" size="large" position="floating" className="absolute top-20 left-10" />
          <NatureSprite type="pine" size="medium" position="floating" className="absolute top-40 right-16" />
          <NatureSprite type="robin" size="small" position="floating" className="absolute top-60 left-1/4" />
          <NatureSprite type="butterfly" size="small" position="floating" className="absolute bottom-40 right-1/4" />
          <NatureSprite type="cloud" size="medium" position="floating" className="absolute top-16 right-1/3" />
          <NatureSprite type="leaf" size="small" position="floating" className="absolute bottom-60 left-1/3" />
          <NatureSprite type="rose" size="small" position="floating" className="absolute top-80 left-1/2" />
          <NatureSprite type="bird" size="small" position="floating" className="absolute bottom-20 left-1/5" />
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
              <h1 className="text-4xl font-display font-bold text-forest-100 mb-4 text-cyber-glow">
                SELECT SCENARIO
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

          {/* Scenarios Carousel */}
          <motion.section 
            className="max-w-7xl mx-auto px-8 py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-forest-100 mb-4 text-cyber-glow">
                ENVIRONMENTAL SIMULATIONS
              </h2>
              <p className="text-lg text-forest-200 font-nature max-w-2xl mx-auto">
                Navigate through complex environmental decision-making scenarios
              </p>
            </div>

            {/* Section Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2">
                {sections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSection === index 
                        ? 'bg-forest-400 scale-125' 
                        : 'bg-forest-600 hover:bg-forest-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSection * 100}%)` }}
                >
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {section.map((scenario, index) => (
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
                            {scenario.unlocked ? (
                              <ScenarioCard scenario={scenario} />
                            ) : (
                              <LockedScenarioCard scenario={scenario} />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-forest-800/80 hover:bg-forest-700/80 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6 text-forest-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                disabled={currentSection === sections.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-forest-800/80 hover:bg-forest-700/80 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6 text-forest-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Section Info */}
            <div className="text-center mt-8">
              <p className="text-forest-400 text-sm font-mono">
                Section {currentSection + 1} of {sections.length} • {unlockedScenarios.length} unlocked scenarios
              </p>
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