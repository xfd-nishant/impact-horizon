import { useState } from "react";
import { motion } from "framer-motion";

export default function GuessForm({ onSubmit }) {
  const [env, setEnv] = useState(5);
  const [econ, setEcon] = useState(5);
  const [social, setSocial] = useState(5);
  const [explanation, setExplanation] = useState("");

  function submit() {
    if (!explanation.trim()) {
      alert("🌱 Please add your reasoning to help us understand your prediction!");
      return;
    }
    onSubmit({ env: Number(env), econ: Number(econ), social: Number(social) }, explanation);
  }

  const impactAreas = [
    { 
      key: 'env', 
      label: 'Environmental', 
      value: env, 
      setter: setEnv, 
      icon: '🌿',
      color: 'forest',
      description: 'Impact on nature, biodiversity, pollution'
    },
    { 
      key: 'econ', 
      label: 'Economic', 
      value: econ, 
      setter: setEcon, 
      icon: '💰',
      color: 'earth',
      description: 'Jobs, revenue, cost-benefit analysis'
    },
    { 
      key: 'social', 
      label: 'Social', 
      value: social, 
      setter: setSocial, 
      icon: '👥',
      color: 'water',
      description: 'Community wellbeing, equity, quality of life'
    }
  ];

  const getImpactLabel = (value) => {
    if (value <= 2) return 'Very Negative';
    if (value <= 4) return 'Negative';
    if (value <= 6) return 'Neutral';
    if (value <= 8) return 'Positive';
    return 'Very Positive';
  };

  const getImpactColor = (value) => {
    if (value <= 2) return 'text-red-600';
    if (value <= 4) return 'text-orange-600';
    if (value <= 6) return 'text-yellow-600';
    if (value <= 8) return 'text-green-600';
    return 'text-emerald-600';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎯</div>
        <p className="text-sm text-forest-600 font-nature">
          Rate the expected impact from 0 (very negative) to 10 (very positive)
        </p>
      </div>

      {impactAreas.map((area, index) => (
        <motion.div
          key={area.key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{area.icon}</span>
              <div>
                <div className="font-display font-semibold text-forest-900">
                  {area.label}
                </div>
                <div className="text-xs text-forest-600 font-nature">
                  {area.description}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${getImpactColor(area.value)}`}>
                {area.value}
              </div>
              <div className={`text-xs ${getImpactColor(area.value)}`}>
                {getImpactLabel(area.value)}
              </div>
            </div>
          </div>

          <div className="relative">
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={area.value} 
              onChange={(e) => area.setter(e.target.value)}
              className={`
                w-full h-3 rounded-lg appearance-none cursor-pointer
                bg-gradient-to-r from-red-200 via-yellow-200 to-green-200
                slider-thumb
              `}
              style={{
                background: `linear-gradient(to right, 
                  #fca5a5 0%, #fcd34d 50%, #86efac 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-forest-500 mt-1">
              <span>Very Negative</span>
              <span>Neutral</span>
              <span>Very Positive</span>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="space-y-3"
      >
        <label className="block">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">💭</span>
            <span className="font-display font-semibold text-forest-900">
              Your Reasoning
            </span>
          </div>
          <textarea 
            value={explanation} 
            onChange={(e) => setExplanation(e.target.value)} 
            placeholder="Explain your prediction in a few sentences..."
            className="w-full border-2 border-forest-200 rounded-xl p-4 font-nature focus:border-forest-400 focus:outline-none resize-none"
            rows={3}
          />
        </label>
      </motion.div>

      <motion.button 
        onClick={submit}
        className="w-full btn-nature text-lg py-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        🔮 Submit Prediction & See Results
      </motion.button>

      <div className="text-center">
        <p className="text-xs text-forest-500 font-nature italic">
          Your prediction will be compared against the scenario's hidden outcomes
        </p>
      </div>
    </div>
  );
}
