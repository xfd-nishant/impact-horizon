import { useRouter } from "next/router";
import scenarios from "../../data/scenarios.json";
import Head from "next/head";
import ChatPanel from "../../components/ChatPanel";
import GuessForm from "../../components/GuessForm";
import OutcomeReveal from "../../components/OutcomeReveal";
import StakeholderAvatar from "../../components/StakeholderAvatar";
import LoadingScreen from "../../components/LoadingScreen";
import { evaluateGuess } from "../../lib/scoring";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScenarioPage() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === id) || scenarios[0];
  const [lastResult, setLastResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);

  useEffect(() => {
    // Simulate loading when entering scenario
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (scenario.personaGoals) {
        setSelectedStakeholder(Object.keys(scenario.personaGoals)[0]);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [id, scenario]);

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

  if (isLoading) {
    return <LoadingScreen isLoading={true} message={`Preparing ${scenario.title}`} />;
  }

  return (
    <>
      <Head>
        <title>{scenario.title} • Impact Sandbox</title>
        <meta name="description" content={scenario.summary} />
      </Head>
      
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

        <motion.main 
          className="max-w-7xl mx-auto p-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Header */}
          <motion.div 
            className="mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button 
              className="btn-nature mb-6 text-sm"
              onClick={() => router.push("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Scenarios
            </motion.button>

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
                  {stakeholders.map((stakeholder, index) => (
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
            {/* Chat Panel - Takes up more space */}
            <motion.div 
              className="xl:col-span-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ChatPanel 
                scenarioId={scenario.id} 
                personaList={stakeholders}
                selectedPersona={selectedStakeholder}
                onPersonaChange={setSelectedStakeholder}
              />
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
                      "{scenario.personaGoals[selectedStakeholder]}"
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
                      {stakeholders.length}
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
        </motion.main>
      </div>
    </>
  );
}
