import Head from "next/head";
import { useRouter } from "next/router";
import scenarios from "../../../data/scenarios.json";
import ChatPanel from "../../../components/ChatPanel";
import { ScenarioContextProvider, useScenarioContext } from "../../../contexts/ScenarioContext";
import { useState } from "react";
import { motion } from "framer-motion";

function ChatPageContent() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === String(id));
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const { context } = useScenarioContext();

  if (!scenario) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest-100">Scenario not found</h1>
          <p className="text-forest-400 mt-2">The requested scenario could not be found.</p>
        </div>
      </div>
    );
  }

  const stakeholders = Object.keys(scenario.personaGoals || {});

  const handleSubmitDecision = () => {
    if (!decision.trim()) {
      alert("Please enter your decision before submitting.");
      return;
    }
    // Here you would handle the decision submission
    console.log("Decision submitted:", decision);
  };

  return (
    <>
      <Head>
        <title>{scenario.title} - Chat • Impact Horizon</title>
      </Head>
      
      <div className="min-h-screen bg-forest-950">
        {/* Header */}
        <div className="bg-forest-900 border-b border-forest-700 py-6">
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-forest-100">
                  {scenario.title}
                </h1>
                <p className="text-forest-400 mt-1">
                  Stakeholder Consultation Phase
                </p>
              </div>
              <button 
                onClick={() => router.push(`/scenario/${scenario.id}/briefing`)}
                className="btn-secondary text-sm"
              >
                Back to Briefing
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Sidebar - Stakeholders & Data */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stakeholder List */}
              <div className="card p-6">
                <h3 className="font-semibold text-forest-100 mb-4 text-cyber-glow">
                  STAKEHOLDERS
                </h3>
                <div className="space-y-2">
                  {stakeholders.map((stakeholder) => (
                    <button
                      key={stakeholder}
                      onClick={() => setSelectedStakeholder(stakeholder)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedStakeholder === stakeholder
                          ? 'bg-forest-700 text-forest-100'
                          : 'text-forest-300 hover:bg-forest-800'
                      }`}
                    >
                      <div className="font-medium text-sm">{stakeholder}</div>
                      <div className="text-xs text-forest-400 mt-1">
                        {scenario.personaGoals[stakeholder]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Neighborhood Stats */}
              {scenario.neighborhoods && (
                <div className="card p-6">
                  <h3 className="font-semibold text-forest-100 mb-4 text-cyber-glow">
                    NEIGHBORHOODS
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(scenario.neighborhoods).map(([name, stats]) => (
                      <div key={name} className="bg-forest-800/50 rounded-lg p-3">
                        <div className="font-medium text-forest-200 text-sm mb-2">{name}</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-forest-400">Flood Risk:</span>
                            <span className="text-forest-300">{stats.floodRisk}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-forest-400">Heat Index:</span>
                            <span className="text-forest-300">{stats.heatIndex}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-forest-400">Vulnerable:</span>
                            <span className="text-forest-300">{stats.vulnerablePopulation}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Budget Info */}
              {scenario.budget && (
                <div className="card p-6">
                  <h3 className="font-semibold text-forest-100 mb-4 text-cyber-glow">
                    BUDGET
                  </h3>
                  <div className="text-2xl font-mono text-forest-200">
                    ${(scenario.budget / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-forest-400 mt-1">Available for interventions</div>
                </div>
              )}

              {/* Credibility Display */}
              {context && (
                <div className="card p-6">
                  <h3 className="font-semibold text-forest-100 mb-4 text-cyber-glow">
                    CREDIBILITY
                  </h3>
                  <div className="text-2xl font-mono text-forest-200 mb-2">
                    {context.credibility}%
                  </div>
                  <div className="w-full bg-forest-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        context.credibility >= 70 ? 'bg-green-500' :
                        context.credibility >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${context.credibility}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-forest-400 mt-2">
                    Stakeholder confidence in your decisions
                  </div>
                </div>
              )}
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3">
              {selectedStakeholder ? (
                <ChatPanel 
                  scenarioId={scenario.id}
                  stakeholder={selectedStakeholder}
                  scenario={scenario}
                />
              ) : (
                <div className="card p-8 text-center">
                  <h3 className="text-xl font-semibold text-forest-100 mb-4">
                    Select a Stakeholder
                  </h3>
                  <p className="text-forest-300">
                    Choose a stakeholder from the left panel to begin the conversation.
                  </p>
                </div>
              )}
            </div>

            {/* Right Sidebar - Interventions */}
            {scenario.interventions && (
              <div className="lg:col-span-1">
                <div className="card p-6">
                  <h3 className="font-semibold text-forest-100 mb-4 text-cyber-glow">
                    INTERVENTIONS
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(scenario.interventions).map(([name, data]) => (
                      <div key={name} className="bg-forest-800/50 rounded-lg p-3">
                        <div className="font-medium text-forest-200 text-sm mb-2">{name}</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-forest-400">Cost:</span>
                            <span className="text-forest-300">${(data.cost / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-forest-400">Heat ↓:</span>
                            <span className="text-forest-300">{data.heatReduction}°C</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-forest-400">Flood ↓:</span>
                            <span className="text-forest-300">{data.floodRiskReduction}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-forest-400">Equity:</span>
                            <span className="text-forest-300">{data.equityImpact}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-forest-400">Maintenance:</span>
                            <span className="text-forest-300">${(data.maintenance / 1000).toFixed(0)}k/yr</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Proceed to Decision Making */}
          <motion.div 
            className="mt-8 card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-forest-100 mb-4 text-cyber-glow">
                READY TO DECIDE?
              </h3>
              <p className="text-forest-300 mb-6">
                You've consulted with stakeholders and reviewed the data. Now it's time to allocate interventions and make your decision.
              </p>
              <button 
                onClick={() => router.push(`/scenario/${scenario.id}/decision`)}
                className="btn-primary text-lg px-8 py-3"
              >
                Proceed to Decision Making
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === String(id));

  if (!scenario) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest-100">Scenario not found</h1>
          <p className="text-forest-400 mt-2">The requested scenario could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <ScenarioContextProvider scenario={scenario}>
      <ChatPageContent />
    </ScenarioContextProvider>
  );
}