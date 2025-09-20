import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "./LoadingScreen";
import StakeholderSprite from "./StakeholderSprite";

export default function ScenarioBriefing({ scenario }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const router = useRouter();

  const briefingText = `Welcome to your mission briefing, Commander.

You are about to navigate one of the most critical environmental decisions of our time. The fate of ${scenario.population.toLocaleString()} lives hangs in the balance.

Your mission: Engage with key stakeholders, understand their perspectives, and make decisions that will shape the future of this region.

The stakes have never been higher. Every choice you make will ripple through time, affecting generations to come.

Are you ready to accept this responsibility?`;

  useEffect(() => {
    if (isTyping && currentIndex < briefingText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(briefingText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (currentIndex >= briefingText.length) {
      setIsTyping(false);
      setShowContinue(true);
    }
  }, [currentIndex, briefingText, isTyping]);

  const handleContinue = () => {
    setShowContinue(false);
    setCurrentText("");
    setCurrentIndex(0);
    setIsTyping(false);
  };

  const handleProceed = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/scenario/${scenario.id}/chat`);
    }, 1000);
  };

  const stakeholders = Object.keys(scenario.personaGoals || {});
  
  const getStakeholderType = (stakeholder) => {
    const name = stakeholder.toLowerCase();
    if (name.includes('scientist') || name.includes('engineer')) return 'scientist';
    if (name.includes('manager') || name.includes('developer')) return 'manager';
    if (name.includes('resident') || name.includes('community')) return 'resident';
    if (name.includes('mayor') || name.includes('commissioner')) return 'mayor';
    if (name.includes('farmer')) return 'farmer';
    if (name.includes('activist')) return 'activist';
    return 'scientist';
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} message="Loading Stakeholder Panel" />
      
      <div className={`min-h-screen relative overflow-hidden ${scenario.background ? `bg-${scenario.background}` : 'bg-forest-950'}`}>
        {/* Background overlay for readability */}
        <div className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm"></div>
        
        {/* Animated background particles */}
        <div className="particle-bg">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 20}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16 relative z-10">
          
          {/* Dramatic Typewriter Briefing */}
          {isTyping || showContinue ? (
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-forest-900/90 backdrop-blur-lg rounded-2xl p-8 border border-forest-600 shadow-2xl">
                <h1 className="text-4xl font-display font-bold text-nature-glow mb-8">
                  MISSION BRIEFING
                </h1>
                <div className="text-lg text-forest-100 leading-relaxed min-h-[300px] flex items-center justify-center">
                  <div className="typewriter text-left">
                    {currentText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </div>
                </div>
                {showContinue && (
                  <motion.button
                    onClick={handleContinue}
                    className="btn-primary mt-6 nature-glow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Continue to Details
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl font-display font-bold text-forest-100 mb-4">
                  Scenario Briefing
                </h1>
                <div className="w-24 h-1 bg-forest-600 mx-auto mb-8"></div>
              </motion.div>

              {/* Scenario Details */}
              <motion.div 
                className="card p-8 mb-8 nature-float"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-2xl font-semibold text-forest-100 mb-4 text-nature-glow">
                  {scenario.title}
                </h2>
                <p className="text-forest-200 leading-relaxed mb-6">
                  {scenario.summary}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="nature-pulse">
                    <div className="text-sm text-forest-400 uppercase tracking-wider mb-1">
                      Population
                    </div>
                    <div className="text-xl font-semibold text-forest-100 text-water-glow">
                      {scenario.population.toLocaleString()}
                    </div>
                  </div>
                  <div className="nature-pulse">
                    <div className="text-sm text-forest-400 uppercase tracking-wider mb-1">
                      Baseline Jobs
                    </div>
                    <div className="text-xl font-semibold text-forest-100 text-earth-glow">
                      {scenario.baseline_jobs}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stakeholders */}
              <motion.div 
                className="card p-8 mb-8 nature-float"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-forest-100 mb-6 text-nature-glow">
                  Key Stakeholders
                </h3>
                <div className="space-y-4">
                  {stakeholders.map((stakeholder, index) => (
                    <motion.div 
                      key={stakeholder}
                      className="flex items-start space-x-4 p-4 bg-forest-800/50 rounded-lg hover:bg-forest-700/50 transition-all duration-300 hover:scale-105"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg flex items-center justify-center nature-glow p-2">
                        <StakeholderSprite 
                          type={getStakeholderType(stakeholder)}
                          size="small"
                          position="pulsing"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-forest-100 mb-1">
                          {stakeholder}
                        </div>
                        <div className="text-sm text-forest-300">
                          {scenario.personaGoals[stakeholder]}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div 
                className="card p-8 mb-8 nature-float"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-forest-100 mb-4 text-nature-glow">
                  Your Mission
                </h3>
                <div className="space-y-3 text-forest-200">
                  <p className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center text-sm font-bold text-forest-100">1</span>
                    <span>Engage with each stakeholder to understand their perspectives</span>
                  </p>
                  <p className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center text-sm font-bold text-forest-100">2</span>
                    <span>Gather information about potential impacts and concerns</span>
                  </p>
                  <p className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-forest-600 rounded-full flex items-center justify-center text-sm font-bold text-forest-100">3</span>
                    <span>Make an informed decision about how to proceed</span>
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.button 
                  onClick={() => router.push('/dashboard')}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Scenarios
                </motion.button>
                <motion.button 
                  onClick={handleProceed}
                  className="btn-primary nature-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Begin Stakeholder Dialogue
                </motion.button>
              </motion.div>
            </>
          )}

        </div>
      </div>
    </>
  );
}