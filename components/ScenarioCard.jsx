import Link from "next/link";
import { motion } from "framer-motion";
import NatureSprite from "./NatureSprite";

export default function ScenarioCard({ scenario }) {
  const getScenarioIcon = (id) => {
    switch (id) {
      case 1: return "tree";
      case 2: return "flower";
      case 3: return "bird";
      default: return "leaf";
    }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Link
        href={`/scenario/${scenario.id}/briefing`}
        className="block card p-6 group relative overflow-hidden"
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-forest-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Scenario icon */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <NatureSprite 
            type={getScenarioIcon(scenario.id)} 
            size="medium" 
            position="pulsing" 
          />
        </div>

        <div className="mb-4 relative z-10">
          <div className="text-xs text-forest-400 uppercase tracking-wider mb-2">
            Scenario {scenario.id}
          </div>
          <h3 className="text-xl font-semibold text-forest-100 mb-3 group-hover:text-forest-50 transition-colors text-nature-glow">
            {scenario.title}
          </h3>
        </div>
        
        <p className="text-forest-200 leading-relaxed mb-6 relative z-10">
          {scenario.summary}
        </p>

        <div className="flex justify-between items-center text-sm relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-forest-500 rounded-full nature-pulse"></div>
              <span className="text-forest-300">Population: {scenario.population.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-forest-400 rounded-full nature-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-forest-300">Jobs: {scenario.baseline_jobs}</span>
            </div>
          </div>
          <motion.span 
            className="text-forest-500 group-hover:text-forest-400 transition-colors text-2xl"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </div>

        {/* Hover effect border */}
        <motion.div
          className="absolute inset-0 border-2 border-forest-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </Link>
    </motion.div>
  );
}