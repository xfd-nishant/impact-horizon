import { motion } from "framer-motion";

function Bar({ label, you, actual }) {
  const max = 10;
  const youPct = (you / max) * 100;
  const actualPct = (actual / max) * 100;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1"><div>{label}</div><div>You {you} • Actual {actual}</div></div>
      <div className="bg-gray-200 h-6 rounded overflow-hidden relative">
        <motion.div initial={{ width: 0 }} animate={{ width: `${actualPct}%` }} transition={{ duration: 0.6 }} className="absolute left-0 top-0 bottom-0 bg-red-400" />
        <motion.div initial={{ width: 0 }} animate={{ width: `${youPct}%` }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute top-0 bottom-0 bg-indigo-600" style={{ opacity: 0.75 }}></motion.div>
      </div>
    </div>
  );
}

export default function OutcomeReveal({ guess, actual, score, explanation }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Outcome</h3>
        <div className="text-sm text-gray-600">Policy score: <span className="font-bold">{score}</span></div>
      </div>

      <Bar label="Environment" you={guess.env} actual={actual.env} />
      <Bar label="Economy" you={guess.econ} actual={actual.econ} />
      <Bar label="Social" you={guess.social} actual={actual.social} />

      <div className="mt-3 text-sm text-gray-700">Your explanation: {explanation}</div>
      <div className="mt-2 text-xs text-gray-500">Narrative generated from scenario rules.</div>
    </div>
  );
}