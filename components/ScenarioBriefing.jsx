import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "./LoadingScreen";

export default function ScenarioBriefing({ scenario }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleProceed = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/scenario/${scenario.id}/chat`);
    }, 1000);
  };

  const stakeholders = Object.keys(scenario.personaGoals || {});

  return (
    <>
      <LoadingScreen isLoading={isLoading} message="Loading Stakeholder Panel" />
      
      <div className="min-h-screen bg-forest-950">
        <div className="max-w-4xl mx-auto px-8 py-16">
          
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
            className="card p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-forest-100 mb-4">
              {scenario.title}
            </h2>
            <p className="text-forest-300 leading-relaxed mb-6">
              {scenario.summary}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-forest-400 uppercase tracking-wider mb-1">
                  Population
                </div>
                <div className="text-xl font-semibold text-forest-200">
                  {scenario.population.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-forest-400 uppercase tracking-wider mb-1">
                  Baseline Jobs
                </div>
                <div className="text-xl font-semibold text-forest-200">
                  {scenario.baseline_jobs}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stakeholders */}
          <motion.div 
            className="card p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-forest-100 mb-6">
              Key Stakeholders
            </h3>
            <div className="space-y-4">
              {stakeholders.map((stakeholder, index) => (
                <motion.div 
                  key={stakeholder}
                  className="flex items-start space-x-4 p-4 bg-forest-800/50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-12 h-12 bg-forest-700 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-semibold text-forest-200">
                      {stakeholder.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-forest-200 mb-1">
                      {stakeholder}
                    </div>
                    <div className="text-sm text-forest-400">
                      {scenario.personaGoals[stakeholder]}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div 
            className="card p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-forest-100 mb-4">
              Your Mission
            </h3>
            <div className="space-y-3 text-forest-300">
              <p>1. Engage with each stakeholder to understand their perspectives</p>
              <p>2. Gather information about potential impacts and concerns</p>
              <p>3. Make an informed decision about how to proceed</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <button 
              onClick={() => router.push('/dashboard')}
              className="btn-secondary"
            >
              Back to Scenarios
            </button>
            <button 
              onClick={handleProceed}
              className="btn-primary"
            >
              Begin Stakeholder Dialogue
            </button>
          </motion.div>

        </div>
      </div>
    </>
  );
}