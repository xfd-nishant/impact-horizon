import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScenarioContext } from "../contexts/ScenarioContext";

export default function ChatPanel({ scenarioId, stakeholder, scenario }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { context, getStakeholderResponse } = useScenarioContext();

  // Initialize with a greeting when stakeholder changes
  useEffect(() => {
    if (stakeholder) {
      const greetings = {
        "City Council": "We need to be very careful with this budget. $5M is a significant amount and we can't afford to waste it on unproven interventions.",
        "Residents' Representative": "The vulnerable populations in Riverside are suffering the most from these heat waves and flood risks. We need immediate action.",
        "Urban Developers": "Any interventions we choose need to be feasible within reasonable construction timelines. What's the implementation plan?",
        "Environmental NGO": "This is our chance to implement truly sustainable solutions! Green roofs, rain gardens, and shade trees will create a healthier ecosystem.",
        "Local Businesses": "We're worried about construction disrupting our operations and customer access. Please ensure minimal disruption."
      };
      
      const greeting = greetings[stakeholder] || `Hello, I'm ${stakeholder}. How can I help you understand my perspective?`;
      
      setMessages([
        {
          id: 1,
          from: "agent",
          text: greeting,
          timestamp: Date.now()
        }
      ]);
    }
  }, [stakeholder]);

  async function sendMessage(text) {
    if (!text.trim()) return;
    
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
      // Call the API directly with the user's message
      const response = await fetch('/api/stakeholder-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stakeholder,
          userMessage: text.trim(),
          scenario: scenario,
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
  }

  const quickPrompts = [
    "What are your main concerns about the heat and flood challenges?",
    "How should we prioritize our $5M budget?",
    "What interventions do you think are most important?",
    "How will this affect vulnerable populations?"
  ];

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="border-b border-forest-700 pb-4 mb-6">
        <h3 className="text-lg font-semibold text-forest-100">
          Conversation with {stakeholder}
        </h3>
        <p className="text-sm text-forest-400 mt-1">
          {scenario.personaGoals?.[stakeholder] || "Stakeholder representative"}
        </p>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto mb-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
        </AnimatePresence>

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
            placeholder={`Message ${stakeholder}...`}
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
  );
}