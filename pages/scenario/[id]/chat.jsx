import Head from "next/head";
import { useRouter } from "next/router";
import scenarios from "../../../data/scenarios.json";
import ChatPanel from "../../../components/ChatPanel";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === String(id));
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [decision, setDecision] = useState("");

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
        <title>{scenario.title} - Chat • Impact Sandbox</title>
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

        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Stakeholder List */}
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h3 className="font-semibold text-forest-100 mb-4">
                  Stakeholders
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
                      <div className="font-medium">{stakeholder}</div>
                      <div className="text-xs text-forest-400 mt-1">
                        {scenario.personaGoals[stakeholder]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
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
          </div>

          {/* Decision Input */}
          <motion.div 
            className="mt-8 card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-forest-100 mb-4">
              Your Decision
            </h3>
            <textarea
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="Based on your conversations with stakeholders, what is your decision? Describe your chosen approach and reasoning..."
              className="w-full h-32 bg-forest-800 border border-forest-700 rounded-lg p-4 text-forest-100 placeholder-forest-500 focus:border-forest-600 focus:outline-none resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-forest-400">
                Summarize your decision after consulting with stakeholders
              </p>
              <button 
                onClick={handleSubmitDecision}
                className="btn-primary"
                disabled={!decision.trim()}
              >
                Submit Decision
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}