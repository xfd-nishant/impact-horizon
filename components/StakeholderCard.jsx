export default function StakeholderCard({ stakeholder, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full rounded-lg border border-emerald-800/60 bg-emerald-950/60 p-4 hover:scale-[1.01] hover:shadow-lg transition"
    >
      <div className="font-semibold text-emerald-100">{stakeholder.name}</div>
      <div className="text-sm text-emerald-300/90">{stakeholder.role}</div>
      <div className="mt-1 text-xs text-emerald-300/70">Mood: {stakeholder.mood}</div>
    </button>
  );
}
