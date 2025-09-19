import scenarios from "../data/scenarios.json";
import ScenarioCard from "./ScenarioCard";

export default function ScenarioDashboard() {
  return (
    <main className="min-h-screen game-surface">
      <header className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-emerald-50 border-b border-emerald-700/50 shadow">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Select a Scenario</h1>
          <p className="mt-2 text-emerald-100/90">Pick a level to begin your decision journey.</p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s) => (
            <ScenarioCard key={s.id} scenario={s} />
          ))}
        </div>
      </section>
    </main>
  );
}