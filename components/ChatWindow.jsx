import { useState } from "react";

export default function ChatWindow({ title = "Chat", onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "npc", text: "Hello there. I’ll share my perspective." },
    { id: 2, from: "npc", text: "This is placeholder text. The real AI comes later." },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const msg = { id: Date.now(), from: "you", text: input.trim() };
    setMessages((m) => [...m, msg]);
    setInput("");
  }

  return (
    <div className="rounded-lg border border-emerald-800/60 bg-emerald-900/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-emerald-100">{title}</div>
        <button onClick={onClose} className="text-sm text-emerald-300 hover:underline">Close</button>
      </div>

      <div className="h-48 overflow-auto rounded border border-emerald-800/50 p-3 bg-emerald-950/40">
        {messages.map((m) => (
          <div key={m.id} className={`mb-2 ${m.from === "you" ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-3 py-2 rounded ${m.from === "you" ? "bg-emerald-600 text-white" : "bg-emerald-800/60 text-emerald-100"}`}>
              <div className="text-sm">{m.text}</div>
              <div className="text-[10px] opacity-70 mt-1">{m.from === "you" ? "You" : "NPC"}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 border border-emerald-800/60 rounded bg-emerald-950/60 px-3 py-2 text-emerald-100 placeholder:text-emerald-400"
        />
        <button onClick={send} className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500 transition">Send</button>
      </div>
    </div>
  );
}