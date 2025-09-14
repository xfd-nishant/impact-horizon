/*
  Simple API route that forwards persona + message + scenario context to OpenAI Chat Completions.
  Expects JSON body: { scenarioId, persona, message, history }
  Requires process.env.OPENAI_API_KEY to be set.
*/
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST" });
  try {
    const { scenarioId, persona, message, history } = req.body || {};
    const path = require("path");
    const fs = require("fs");
    const scenariosPath = path.resolve(process.cwd(), "data", "scenarios.json");
    const scenarios = JSON.parse(fs.readFileSync(scenariosPath, "utf-8"));
    const scenario = scenarios.find((s) => s.id === String(scenarioId)) || scenarios[0];

    const systemPrompt = [
      { role: "system", content: `You are acting as the stakeholder "${persona}". Use the following persona goals: ${JSON.stringify(scenario.personaGoals || {})}. Keep replies short (1-3 sentences) and relevant to local context.` }
    ];

    // Build chat history (if any)
    const chatMessages = (history || []).slice(-10).map((m) => {
      return { role: m.role === "user" ? "user" : "assistant", content: m.content };
    });

    const userMessage = { role: "user", content: `${message}\n\nScenario summary: ${scenario.summary}. Population: ${scenario.population}. Baseline jobs: ${scenario.baseline_jobs}` };

    const body = {
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [...systemPrompt, ...chatMessages, userMessage],
      max_tokens: 300,
      temperature: 0.6
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    const json = await r.json();
    const reply = json?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
}
