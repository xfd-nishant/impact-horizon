import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScenarioContext } from "../contexts/ScenarioContext";

export default function NewObjectivePhase({ 
  scenario, 
  previousAllocations, 
  onContinue 
}) {
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { context } = useScenarioContext();

  const stakeholders = [
    "City Council",
    "Residents' Representative", 
    "Urban Developers",
    "Environmental NGO",
    "Local Businesses"
  ];

  const newObjectives = {
    "City Council": "Address budget overruns and ensure fiscal responsibility",
    "Residents' Representative": "Improve conditions for vulnerable populations",
    "Urban Developers": "Optimize construction timelines and feasibility",
    "Environmental NGO": "Enhance environmental sustainability measures",
    "Local Businesses": "Minimize operational disruptions and support recovery"
  };

  const handleStakeholderSelect = (stakeholder) => {
    setSelectedStakeholder(stakeholder);
    setMessages([]);
    
    // Add initial message for the new objective
    const objectiveMessage = {
      id: 1,
      from: "agent",
      text: `Now that we've seen the results of your previous decisions, we need to focus on our new priority: ${newObjectives[stakeholder]}. What would you like to discuss?`,
      timestamp: Date.now()
    };
    setMessages([objectiveMessage]);
  };

  const sendMessage = async (text) => {
    if (!text.trim() || !selectedStakeholder) return;
    
    const userMessage = { 
      id: Date.now(), 
      from: "user", 
      text: text.trim(),
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await fetch('/api/stakeholder-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stakeholder: selectedStakeholder,
          userMessage: text.trim(),
          scenario: scenario,
          phase: "new_objective",
          previousAllocations: previousAllocations,
          ...context?.getContext()
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          from: "agent", 
          text: data.response,
          timestamp: Date.now(),
          mood: data.mood,
          credibilityChange: data.credibilityChange
        }]);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (err) {
      console.error('Error getting stakeholder response:', err);
      setMessages(prev => [...prev, { 
        id: Date.now() + 3, 
        from: "agent", 
        text: "I'm sorry, I'm having connection issues. Please try again.",
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "What should be our next priority?",
    "How can we improve the current situation?",
    "What are the biggest challenges we face now?",
    "What resources do we need for the next phase?"
  ];

  return (
    <div className="min-h-screen bg-forest-950 py-8">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-forest-100 mb-4 text-cyber-glow">
            NEW OBJECTIVE PHASE
          </h1>
          <p className="text-forest-300 text-lg">
            Based on your previous decisions, stakeholders have new priorities and concerns
          </p>
          <div className="w-24 h-1 bg-forest-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stakeholder Selection */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-forest-100 mb-4 text-cyber-glow">
                SELECT STAKEHOLDER
              </h2>
              <div className="space-y-3">
                {stakeholders.map((stakeholder) => (
                  <button
                    key={stakeholder}
                    onClick={() => handleStakeholderSelect(stakeholder)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedStakeholder === stakeholder
                        ? 'bg-forest-600 text-forest-100'
                        : 'bg-forest-800 text-forest-300 hover:bg-forest-700'
                    }`}
                  >
                    <div className="font-medium">{stakeholder}</div>
                    <div className="text-sm opacity-75 mt-1">
                      {newObjectives[stakeholder]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Previous Decision Summary */}
            <div className="card p-6 mt-6">
              <h3 className="font-semibold text-forest-100 mb-3 text-cyber-glow">
                PREVIOUS DECISIONS
              </h3>
              <div className="space-y-2 text-sm">
                {Object.entries(previousAllocations).map(([key, cost]) => {
                  const [neighborhood, intervention] = key.split('-');
                  return (
                    <div key={key} className="flex justify-between">
                      <span className="text-forest-300">{intervention}</span>
                      <span className="text-forest-200">${(cost/1000000).toFixed(1)}M</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-2">
            {selectedStakeholder ? (
              <div className="card p-6">
                {/* Header */}
                <div className="border-b border-forest-700 pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-forest-100">
                    Conversation with {selectedStakeholder}
                  </h3>
                  <p className="text-sm text-forest-400 mt-1">
                    New Priority: {newObjectives[selectedStakeholder]}
                  </p>
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto mb-6 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`
                        max-w-xs lg:max-w-md px-4 py-3 rounded-lg
                        ${message.from === "user" 
                          ? "bg-forest-600 text-forest-100" 
                          : "bg-forest-800 text-forest-200 border border-forest-700"
                        }
                      `}>
                        <div className="text-sm leading-relaxed">
                          {message.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading indicator */}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-forest-800 border border-forest-700 px-4 py-3 rounded-lg">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-forest-500 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ 
                                duration: 0.8, 
                                repeat: Infinity, 
                                delay: i * 0.2 
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input 
                      value={input} 
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage(input);
                        }
                      }}
                      placeholder={`Message ${selectedStakeholder}...`}
                      className="flex-1 bg-forest-800 border border-forest-700 rounded-lg px-4 py-3 text-forest-100 placeholder-forest-500 focus:border-forest-600 focus:outline-none"
                      disabled={loading}
                    />
                    <button 
                      onClick={() => sendMessage(input)}
                      className="btn-primary px-6"
                      disabled={loading || !input.trim()}
                    >
                      Send
                    </button>
                  </div>

                  {/* Quick prompts */}
                  <div className="grid grid-cols-2 gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(prompt)}
                        className="text-xs px-3 py-2 bg-forest-800 text-forest-300 rounded-lg hover:bg-forest-700 transition-colors text-left"
                        disabled={loading}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-6 text-center">
                <h3 className="text-lg font-semibold text-forest-100 mb-2">
                  Select a Stakeholder
                </h3>
                <p className="text-forest-400">
                  Choose a stakeholder to discuss the new objectives and priorities
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onContinue}
            className="btn-primary px-8 py-3"
          >
            Proceed to Next Phase
          </button>
        </div>
      </div>
    </div>
  );
}