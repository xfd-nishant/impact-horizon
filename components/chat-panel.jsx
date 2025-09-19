import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StakeholderAvatar from "./StakeholderAvatar";

export default function ChatPanel({ 
  scenarioId, 
  personaList = ["CEO", "Villager", "Mayor"],
  selectedPersona,
  onPersonaChange
}) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: "system", 
      text: "🌍 Welcome to the Impact Sandbox! Chat with stakeholders to understand different perspectives before making your prediction.", 
      persona: "System"
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingPersona, setTypingPersona] = useState(null);

  useEffect(() => {
    if (selectedPersona && onPersonaChange) {
      // Auto-send a greeting when switching personas
      const greetings = {
        CEO: "Hello! I'm excited to discuss the economic opportunities this presents.",
        Villager: "Hi there. I'm concerned about how this will affect our community.",
        Mayor: "Good to meet you. I need to balance everyone's interests here.",
        Developer: "Greetings! Let me share the sustainable benefits of this project.",
        Farmer: "Hello. This land has been in my family for generations.",
        "Local NGO": "Hi! I'm here to advocate for environmental protection."
      };
      
      if (greetings[selectedPersona]) {
        setTimeout(() => {
          setMessages(m => [...m, {
            id: Date.now(),
            from: "agent",
            persona: selectedPersona,
            text: greetings[selectedPersona]
          }]);
        }, 500);
      }
    }
  }, [selectedPersona]);

  async function sendMessage(text, persona = selectedPersona) {
    if (!text.trim()) return;
    
    const messageObj = { id: Date.now(), from: "user", persona, text };
    setMessages((m) => [...m, messageObj]);
    setLoading(true);
    setTypingPersona(persona);
    
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId,
          persona,
          message: text,
          history: messages.concat(messageObj).map((m) => ({ 
            role: m.from === "user" ? "user" : "assistant", 
            content: m.text 
          })),
        }),
      });
      const json = await res.json();
      const reply = json.reply || "I appreciate your question, but I'm having trouble responding right now.";
      
      // Simulate typing delay
      setTimeout(() => {
        setMessages((m) => [...m, { 
          id: Date.now() + 1, 
          from: "agent", 
          persona, 
          text: reply 
        }]);
        setTypingPersona(null);
      }, 1000 + Math.random() * 1000);
      
    } catch (err) {
      setTimeout(() => {
        setMessages((m) => [...m, { 
          id: Date.now() + 2, 
          from: "agent", 
          persona, 
          text: "I'm sorry, I'm having trouble connecting right now. Please try again." 
        }]);
        setTypingPersona(null);
      }, 1000);
    } finally {
      setLoading(false);
    }
  }

  const quickPrompts = [
    { text: "How will this affect jobs in 5 years?", icon: "💼", theme: "earth" },
    { text: "What are the environmental risks?", icon: "🌿", theme: "forest" },
    { text: "How can we minimize negative impacts?", icon: "⚖️", theme: "water" },
    { text: "What do community members think?", icon: "👥", theme: "sky" }
  ];

  return (
    <div className="nature-card p-6">
      {/* Header with Stakeholder Selection */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-display font-bold text-forest-900">
            Stakeholder Dialogue
          </h2>
          {selectedPersona && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-forest-600">Speaking with:</span>
              <StakeholderAvatar 
                stakeholder={selectedPersona}
                size="sm"
                isActive={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Stakeholder Selector */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-forest-50/50 rounded-xl">
        {personaList.map((persona) => (
          <motion.div
            key={persona}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <StakeholderAvatar
              stakeholder={persona}
              size="md"
              isActive={selectedPersona === persona}
              onClick={() => onPersonaChange && onPersonaChange(persona)}
            />
          </motion.div>
        ))}
      </div>

      {/* Messages Area */}
      <div className="h-80 overflow-auto p-4 bg-white/60 rounded-xl mb-4 space-y-4">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`
                max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative
                ${m.from === "user" 
                  ? "bg-forest-600 text-white ml-8" 
                  : m.from === "system"
                    ? "bg-sky-100 text-sky-800 mx-auto text-center text-sm"
                    : "bg-white border-2 border-forest-200 text-forest-900 mr-8"
                }
              `}>
                {m.from === "agent" && m.persona && (
                  <div className="flex items-center space-x-2 mb-2">
                    <StakeholderAvatar 
                      stakeholder={m.persona}
                      size="sm"
                    />
                    <span className="text-xs font-display font-semibold text-forest-600">
                      {m.persona}
                    </span>
                  </div>
                )}
                
                <div className="text-sm leading-relaxed font-nature">
                  {m.text}
                </div>
                
                {m.from === "user" && (
                  <div className="text-xs opacity-75 mt-1">
                    You → {m.persona}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {typingPersona && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white border-2 border-forest-200 text-forest-900 max-w-xs px-4 py-3 rounded-2xl mr-8">
              <div className="flex items-center space-x-2 mb-2">
                <StakeholderAvatar 
                  stakeholder={typingPersona}
                  size="sm"
                />
                <span className="text-xs font-display font-semibold text-forest-600">
                  {typingPersona}
                </span>
              </div>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-forest-400 rounded-full"
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

      {/* Input Area */}
      <div className="flex gap-3 mb-4">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
              setInput("");
            }
          }}
          placeholder={`Ask ${selectedPersona || 'a stakeholder'} a question...`}
          className="flex-1 px-4 py-3 border-2 border-forest-200 rounded-xl focus:border-forest-400 focus:outline-none font-nature"
          disabled={loading}
        />
        <motion.button 
          onClick={() => { 
            sendMessage(input); 
            setInput(""); 
          }}
          className="btn-nature px-6"
          disabled={loading || !input.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="loading-leaf" />
              <span>Sending</span>
            </div>
          ) : (
            "Send"
          )}
        </motion.button>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-2 gap-2">
        {quickPrompts.map((prompt, index) => (
          <motion.button
            key={index}
            onClick={() => sendMessage(prompt.text)}
            className={`
              text-xs px-3 py-2 rounded-lg transition-all duration-200
              bg-${prompt.theme}-100 text-${prompt.theme}-700 
              hover:bg-${prompt.theme}-200 hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center space-x-2 font-nature
            `}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{prompt.icon}</span>
            <span>{prompt.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
