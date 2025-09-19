import { useState } from "react";

export default function GuessForm({ onSubmit }) {
  const [env, setEnv] = useState(5);
  const [econ, setEcon] = useState(5);
  const [social, setSocial] = useState(5);
  const [explanation, setExplanation] = useState("");

  function submit() {
    if (!explanation.trim()) {
      alert("Please add a one-line explanation of your intuition.");
      return;
    }
    onSubmit({ env: Number(env), econ: Number(econ), social: Number(social) }, explanation);
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Guesstimates</h3>

      <label className="text-sm">Environment: {env}</label>
      <input type="range" min="0" max="10" value={env} onChange={(e) => setEnv(e.target.value)} className="w-full mb-3" />

      <label className="text-sm">Economy: {econ}</label>
      <input type="range" min="0" max="10" value={econ} onChange={(e) => setEcon(e.target.value)} className="w-full mb-3" />

      <label className="text-sm">Social: {social}</label>
      <input type="range" min="0" max="10" value={social} onChange={(e) => setSocial(e.target.value)} className="w-full mb-3" />

      <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="One-sentence intuition" className="w-full border rounded p-2 mb-3" rows={2} />

      <button onClick={submit} className="w-full bg-indigo-600 text-white py-2 rounded">Submit Guess & Evaluate</button>
    </div>
  );
}
