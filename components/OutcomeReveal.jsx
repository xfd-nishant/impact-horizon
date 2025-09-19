import { motion } from "framer-motion";

function Bar({ label, you, actual, icon, color }) {
  const max = 10;
  const youPct = (you / max) * 100;
  const actualPct = (actual / max) * 100;
  const difference = Math.abs(you - actual);
  const accuracy = Math.max(0, 10 - difference);
  
  const getAccuracyColor = (acc) => {
    if (acc >= 8) return 'text-emerald-600';
    if (acc >= 6) return 'text-green-600';
    if (acc >= 4) return 'text-yellow-600';
    if (acc >= 2) return 'text-orange-600';
    return 'text-red-600';
  };

  const getValueColor = (value) => {
    if (value <= 2) return 'bg-red-400';
    if (value <= 4) return 'bg-orange-400';
    if (value <= 6) return 'bg-yellow-400';
    if (value <= 8) return 'bg-green-400';
    return 'bg-emerald-400';
  };

  return (
    <motion.div 
      className="mb-6 p-4 rounded-xl bg-white/60 border border-forest-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <div className="font-display font-semibold text-forest-900">{label}</div>
            <div className="text-xs text-forest-600">
              Your prediction vs. reality
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-bold ${getAccuracyColor(accuracy)}`}>
            {accuracy >= 8 ? '🎯 Excellent' : 
             accuracy >= 6 ? '✅ Good' : 
             accuracy >= 4 ? '⚠️ Fair' : 
             accuracy >= 2 ? '❌ Poor' : '💥 Way Off'}
          </div>
          <div className="text-xs text-forest-600">
            Accuracy: {accuracy}/10
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {/* Your Prediction */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-forest-700">Your Prediction:</span>
          <span className="font-semibold text-forest-900">{you}/10</span>
        </div>
        <div className="bg-forest-100 h-4 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${youPct}%` }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`absolute left-0 top-0 bottom-0 ${getValueColor(you)} rounded-full`}
          />
        </div>

        {/* Actual Result */}
        <div className="flex items-center justify-between text-sm mt-3">
          <span className="text-forest-700">Actual Result:</span>
          <span className="font-semibold text-forest-900">{actual}/10</span>
        </div>
        <div className="bg-forest-100 h-4 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${actualPct}%` }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`absolute left-0 top-0 bottom-0 ${getValueColor(actual)} rounded-full border-2 border-white shadow-sm`}
          />
        </div>

        {/* Difference Indicator */}
        <div className="flex items-center justify-center mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getAccuracyColor(accuracy)} bg-white`}>
            {difference === 0 ? '🎯 Perfect match!' : 
             difference === 1 ? '✨ Very close!' :
             difference <= 2 ? '👍 Close enough' :
             difference <= 4 ? '📊 Some deviation' : 
             '🌊 Major difference'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function OutcomeReveal({ guess, actual, score, explanation }) {
  const impactAreas = [
    { key: 'env', label: 'Environmental', icon: '🌿', color: 'forest' },
    { key: 'econ', label: 'Economic', icon: '💰', color: 'earth' },
    { key: 'social', label: 'Social', icon: '👥', color: 'water' }
  ];

  const getOverallGrade = (score) => {
    if (score >= 9) return { grade: 'A+', emoji: '🏆', color: 'text-emerald-600', message: 'Outstanding prediction!' };
    if (score >= 8) return { grade: 'A', emoji: '🎯', color: 'text-green-600', message: 'Excellent foresight!' };
    if (score >= 7) return { grade: 'B+', emoji: '✨', color: 'text-green-500', message: 'Very good analysis!' };
    if (score >= 6) return { grade: 'B', emoji: '👍', color: 'text-yellow-600', message: 'Good understanding!' };
    if (score >= 5) return { grade: 'C+', emoji: '📊', color: 'text-yellow-500', message: 'Decent prediction!' };
    if (score >= 4) return { grade: 'C', emoji: '⚖️', color: 'text-orange-500', message: 'Room for improvement' };
    if (score >= 3) return { grade: 'D+', emoji: '📈', color: 'text-orange-600', message: 'Keep learning!' };
    if (score >= 2) return { grade: 'D', emoji: '🎲', color: 'text-red-500', message: 'Try again!' };
    return { grade: 'F', emoji: '🌊', color: 'text-red-600', message: 'Complex systems are tricky!' };
  };

  const gradeInfo = getOverallGrade(score);

  return (
    <motion.div 
      className="nature-card p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header with Overall Score */}
      <motion.div 
        className="text-center mb-8 p-6 bg-gradient-to-r from-forest-100 to-water-100 rounded-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="text-6xl mb-2">{gradeInfo.emoji}</div>
        <h2 className="text-3xl font-display font-black text-forest-900 mb-2">
          Impact Analysis Results
        </h2>
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className={`text-4xl font-display font-black ${gradeInfo.color}`}>
            {gradeInfo.grade}
          </div>
          <div className="text-2xl font-display font-bold text-forest-700">
            {score}/10
          </div>
        </div>
        <p className="text-lg font-nature text-forest-700">
          {gradeInfo.message}
        </p>
      </motion.div>

      {/* Detailed Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-display font-bold text-forest-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">📊</span>
          Detailed Breakdown
        </h3>

        {impactAreas.map((area, index) => (
          <Bar 
            key={area.key}
            label={area.label}
            you={guess[area.key]}
            actual={actual[area.key]}
            icon={area.icon}
            color={area.color}
          />
        ))}
      </div>

      {/* Your Reasoning */}
      <motion.div 
        className="mt-8 p-6 bg-sky-50 rounded-xl border border-sky-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-2xl">💭</span>
          <h4 className="font-display font-semibold text-forest-900">
            Your Reasoning
          </h4>
        </div>
        <p className="font-nature text-forest-700 italic">
          "{explanation}"
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="mt-8 text-center p-6 bg-gradient-to-r from-forest-50 to-earth-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="text-4xl mb-3">🌍</div>
        <h4 className="text-lg font-display font-bold text-forest-900 mb-2">
          Understanding Complex Systems
        </h4>
        <p className="text-sm text-forest-600 font-nature">
          Environmental, economic, and social factors interact in complex ways. 
          Your predictions help build intuition for real-world policy making.
        </p>
      </motion.div>
    </motion.div>
  );
}