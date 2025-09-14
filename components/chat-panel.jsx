import { useState } from "react";

export default function ChatPanel({ scenarioId, personaList = ["CEO", "Villager", "Mayor"] }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "system", text: "This is a demo conversation. Use quick prompts or type your own question." },
  ]);
  const [input, setInput] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(personaList[0] || "CEO");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text, persona = selectedPersona) {
    const messageObj = { id: Date.now(), from: "user", persona, text };
    setMessages((m) => [...m, messageObj]);
    setLoading(true);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId,
          persona,
          message: text,
          history: messages.concat(messageObj).map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text })),
        }),
      });
      const json = await res.json();
      const reply = json.reply || "Sorry, no reply.";
      setMessages((m) => [...m, { id: Date.now() + 1, from: "agent", persona, text: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { id: Date.now() + 2, from: "agent", persona, text: "API error: " + String(err) }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          {personaList.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPersona(p)}
              className={`px-2 py-1 rounded ${selectedPersona === p ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500">Persona: {selectedPersona}</div>
      </div>

      <div className="h-64 overflow-auto p-2 border rounded mb-3">
        {messages.map((m) => (
          <div key={m.id} className={`mb-3 ${m.from === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-3 py-2 rounded ${m.from === "user" ? "bg-indigo-50" : "bg-gray-100"}`}>
              <div className="text-sm">{m.text}</div>
              <div className="text-xs text-gray-400 mt-1">{m.from === "user" ? "You" : m.persona || "Agent"}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex-1 border rounded px-3 py-2" />
        <button onClick={() => { if (input.trim()) { sendMessage(input); setInput(""); } }} className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50" disabled={loading}>Send</button>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={() => sendMessage("How will this affect jobs in 5 years?")} className="text-sm px-3 py-1 rounded bg-gray-100">Ask about jobs</button>
        <button onClick={() => sendMessage("Will water quality be impacted?")} className="text-sm px-3 py-1 rounded bg-gray-100">Ask about water</button>
        <button onClick={() => sendMessage("Suggest mitigation measures to reduce environmental harm.") } className="text-sm px-3 py-1 rounded bg-gray-100">Request mitigation</button>
      </div>
    </div>
  );
}
