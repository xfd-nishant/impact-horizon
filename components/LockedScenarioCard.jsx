import { motion } from "framer-motion";
import NatureSprite from "./NatureSprite";

export default function LockedScenarioCard({ scenario }) {
  const getScenarioIcon = (id) => {
    switch (id) {
      case "4": return "oak";
      case "5": return "pine";
      case "6": return "robin";
      case "7": return "butterfly";
      case "8": return "rose";
      case "9": return "cloud";
      default: return "leaf";
    }
  };

  const getBackgroundClass = (background) => {
    switch (background) {
      case "forest-scene": return "bg-forest-scene";
      case "coastal-scene": return "bg-coastal-scene";
      case "urban-scene": return "bg-urban-scene";
      default: return "bg-forest-scene";
    }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      className="group"
    >
      <div
        className={`block card p-6 group relative overflow-hidden ${getBackgroundClass(scenario.background)} opacity-60`}
      >
        {/* Background overlay for readability */}
        <div className="absolute inset-0 bg-forest-900/90 backdrop-blur-sm"></div>
        
        {/* Lock overlay */}
        <div className="absolute inset-0 bg-forest-950/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-forest-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-forest-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-forest-300 font-mono text-sm">COMING SOON</div>
          </div>
        </div>

        {/* Scenario icon */}
        <div className="absolute top-4 right-4 opacity-20">
          <NatureSprite 
            type={getScenarioIcon(scenario.id)} 
            size="medium" 
            position="pulsing" 
          />
        </div>

        {/* Lock icon */}
        <div className="absolute top-4 left-4 w-8 h-8 icon-decision opacity-20"></div>

        <div className="mb-4 relative z-10">
          <div className="text-xs text-forest-500 uppercase tracking-wider mb-2">
            Scenario {scenario.id}
          </div>
          <h3 className="text-xl font-semibold text-forest-300 mb-3">
            {scenario.title}
          </h3>
        </div>
        
        <p className="text-forest-400 leading-relaxed mb-6 relative z-10">
          {scenario.summary}
        </p>

        <div className="flex justify-between items-center text-sm relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-forest-600 rounded-full"></div>
              <span className="text-forest-500">Population: {scenario.population.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-forest-600 rounded-full"></div>
              <span className="text-forest-500">Jobs: {scenario.baseline_jobs}</span>
            </div>
          </div>
          <span className="text-forest-600 text-2xl">
            🔒
          </span>
        </div>

        {/* Locked border */}
        <div className="absolute inset-0 border-2 border-forest-700 rounded-xl opacity-50"></div>
      </div>
    </motion.div>
  );
}