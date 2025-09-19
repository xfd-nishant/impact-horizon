import NPCDialogue from "./NPCDialogue";
import ChatWindow from "./ChatWindow";
import StakeholderCard from "./StakeholderCard";
import StakeholderAvatar from "./StakeholderAvatar";
import GuessForm from "./GuessForm";
import OutcomeReveal from "./OutcomeReveal";
import LoadingScreen from "./LoadingScreen";
import { evaluateGuess } from "../lib/scoring";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScenarioView({ scenario }) {
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading when entering scenario
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (scenario.personaGoals) {
        setSelectedStakeholder(Object.keys(scenario.personaGoals)[0]);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [scenario]);

  const getScenarioTheme = (scenarioId) => {
    switch(scenarioId) {
      case "1": return {
        gradient: "from-water-600/20 via-forest-600/20 to-earth-600/20",
        primaryColor: "water",
        icon: "🏭",
        bgElements: ['💧', '🐟', '🏭', '🌊']
      };
      case "2": return {
        gradient: "from-forest-600/20 via-earth-600/20 to-water-400/20",
        primaryColor: "forest", 
        icon: "☀️",
        bgElements: ['☀️', '🌾', '⚡', '🌱']
      };
      default: return {
        gradient: "from-sky-600/20 via-forest-600/20 to-earth-600/20",
        primaryColor: "sky",
        icon: "🌍", 
        bgElements: ['🌍', '🌿', '💚', '🔬']
      };
    }
  };

  const theme = getScenarioTheme(scenario.id);
  const stakeholders = Object.keys(scenario.personaGoals || {});

  // Default stakeholders if none in scenario data
  const defaultStakeholders = [
    { id: "CEO", name: "Factory CEO", role: "Industry", mood: "Confident" },
    { id: "Villager", name: "Local Villager", role: "Community", mood: "Concerned" },
    { id: "Mayor", name: "Town Mayor", role: "Government", mood: "Measured" },
  ];

  const activeStakeholders = stakeholders.length > 0 ? stakeholders : defaultStakeholders.map(s => s.id);

  if (isLoading) {
    return <LoadingScreen isLoading={true} message={`Preparing ${scenario.title}`} />;
  }

  return (
    <div className="nature-bg min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {theme.bgElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 3,
            }}
          >
            {element}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`nature-card p-8 bg-gradient-to-br ${theme.gradient}`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-5xl">{theme.icon}</div>
                  <div>
                    <div className="text-xs font-display text-forest-600 uppercase tracking-wider mb-1">
                      Environmental Scenario {scenario.id}
                    </div>
                    <h1 className="text-4xl font-display font-black text-forest-900 text-glow">
                      {scenario.title}
                    </h1>
                  </div>
                </div>
                
                <p className="text-lg text-forest-700 font-nature leading-relaxed max-w-3xl">
                  {scenario.summary}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="text-right space-y-2">
                <div className="nature-card p-4 bg-white/60">
                  <div className="text-2xl font-display font-bold text-forest-800">
                    {scenario.population.toLocaleString()}
                  </div>
                  <div className="text-xs text-forest-600 uppercase tracking-wide">
                    Population
                  </div>
                </div>
                <div className="nature-card p-4 bg-white/60">
                  <div className="text-2xl font-display font-bold text-earth-700">
                    {scenario.baseline_jobs}
                  </div>
                  <div className="text-xs text-forest-600 uppercase tracking-wide">
                    Baseline Jobs
                  </div>
                </div>
              </div>
            </div>

            {/* Stakeholder Preview */}
            <div className="border-t border-forest-200/50 pt-6">
              <h3 className="text-lg font-display font-semibold text-forest-900 mb-4">
                Key Stakeholders
              </h3>
              <div className="flex space-x-4">
                {activeStakeholders.map((stakeholder, index) => (
                  <motion.div
                    key={stakeholder}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 * index, duration: 0.4 }}
                  >
                    <StakeholderAvatar
                      stakeholder={stakeholder}
                      size="md"
                      showDetails={true}
                      isActive={selectedStakeholder === stakeholder}
                      onClick={() => setSelectedStakeholder(stakeholder)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <motion.div 
            className="xl:col-span-3 space-y-8"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Briefing */}
            <NPCDialogue
              lines={[
                "🌍 Welcome, environmental decision-maker. Here's your briefing.",
                "A complex project is proposed with potential environmental, economic, and social trade-offs.",
                "You'll engage with diverse stakeholders to understand different perspectives.",
                "Use their insights to make your prediction about the project's impacts.",
              ]}
            />

            {/* Stakeholder Interaction */}
            <section className="nature-card p-8">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl">💬</span>
                <div>
                  <h2 className="text-2xl font-display font-bold text-forest-900">
                    Stakeholder Dialogue
                  </h2>
                  <p className="text-forest-600 font-nature">
                    Engage with key stakeholders to understand their perspectives
                  </p>
                </div>
              </div>

              {/* Stakeholder Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {activeStakeholders.map((stakeholder) => (
                  <StakeholderCard
                    key={stakeholder}
                    stakeholder={{ id: stakeholder, name: stakeholder }}
                    onClick={() => setSelectedStakeholder(stakeholder)}
                    isSelected={selectedStakeholder === stakeholder}
                  />
                ))}
              </div>

              {/* Chat Window */}
              {selectedStakeholder && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ChatWindow
                    title={`${selectedStakeholder} • ${scenario.personaGoals?.[selectedStakeholder] || 'Stakeholder'}`}
                    onClose={() => setSelectedStakeholder(null)}
                    stakeholder={selectedStakeholder}
                    scenario={scenario}
                  />
                </motion.div>
              )}
            </section>
          </motion.div>

          {/* Sidebar */}
          <motion.aside 
            className="space-y-6"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Active Stakeholder Detail */}
            {selectedStakeholder && (
              <div className="nature-card p-6">
                <div className="text-center mb-4">
                  <StakeholderAvatar
                    stakeholder={selectedStakeholder}
                    size="xl"
                    showDetails={true}
                    isActive={true}
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-display font-bold text-forest-900 mb-2">
                    Current Focus
                  </h4>
                  <p className="text-sm text-forest-700 font-nature italic">
                    "{scenario.personaGoals?.[selectedStakeholder] || 'Engaged in meaningful dialogue'}"
                  </p>
                </div>
              </div>
            )}

            {/* Impact Prediction */}
            <div className="nature-card p-6">
              <h3 className="font-display font-semibold text-forest-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Make Your Prediction
              </h3>
              <GuessForm
                onSubmit={(guess, explanation) => {
                  const res = evaluateGuess(guess, scenario);
                  setLastResult({ guess, explanation, ...res });
                }}
              />
            </div>

            {/* Scenario Intelligence */}
            <div className="nature-card p-6">
              <h3 className="font-display font-semibold text-forest-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">📊</span>
                Intelligence Brief
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Complexity Level</span>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-forest-400 rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Stakeholder Count</span>
                  <span className="font-semibold text-forest-800">
                    {activeStakeholders.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Impact Domains</span>
                  <div className="flex space-x-1">
                    <span className="text-xs px-2 py-1 bg-water-100 text-water-700 rounded-full">
                      Environmental
                    </span>
                    <span className="text-xs px-2 py-1 bg-earth-100 text-earth-700 rounded-full">
                      Economic
                    </span>
                    <span className="text-xs px-2 py-1 bg-forest-100 text-forest-700 rounded-full">
                      Social
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Results Section */}
        {lastResult && (
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <OutcomeReveal 
              guess={lastResult.guess} 
              actual={lastResult.actual} 
              score={lastResult.score} 
              explanation={lastResult.explanation} 
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}