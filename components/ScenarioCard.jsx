import Link from "next/link";
import { motion } from "framer-motion";

export default function ScenarioCard({ scenario }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/scenario/${scenario.id}/briefing`}
        className="block card p-6 group"
      >
        <div className="mb-4">
          <div className="text-xs text-forest-400 uppercase tracking-wider mb-2">
            Scenario {scenario.id}
          </div>
          <h3 className="text-xl font-semibold text-forest-100 mb-3 group-hover:text-forest-50 transition-colors">
            {scenario.title}
          </h3>
        </div>
        
        <p className="text-forest-300 leading-relaxed mb-6">
          {scenario.summary}
        </p>

        <div className="flex justify-between items-center text-sm">
          <div className="space-y-1 text-forest-400">
            <div>Population: {scenario.population.toLocaleString()}</div>
            <div>Jobs: {scenario.baseline_jobs}</div>
          </div>
          <span className="text-forest-500 group-hover:text-forest-400 transition-colors">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}