import NPCDialogue from "./NPCDialogue";
import ChatWindow from "./ChatWindow";
import StakeholderCard from "./StakeholderCard";
import { useState } from "react";

export default function ScenarioView({ scenario }) {
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);

  const stakeholders = [
    { id: "ceo", name: "Factory CEO", role: "Industry", mood: "Confident" },
    { id: "villager", name: "Local Villager", role: "Community", mood: "Concerned" },
    { id: "mayor", name: "Town Mayor", role: "Government", mood: "Measured" },
    { id: "ngo", name: "River Watch NGO", role: "Environment", mood: "Cautious" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <NPCDialogue
          lines={[
            "Welcome, decision-maker. Here's your briefing.",
            "A new project is proposed nearby with potential trade-offs.",
            "You'll hear from stakeholders before making a call.",
            "Now make your best decision.",
          ]}
        />

        <section className="bg-emerald-900/40 border border-emerald-800/60 rounded-lg p-4">
          <div className="mb-3 font-semibold text-emerald-100">Stakeholders</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stakeholders.map((st) => (
              <StakeholderCard
                key={st.id}
                stakeholder={st}
                onClick={() => setSelectedStakeholder(st)}
              />
            ))}
          </div>

          {selectedStakeholder && (
            <div className="mt-5">
              <ChatWindow
                title={`${selectedStakeholder.name} • ${selectedStakeholder.role}`}
                onClose={() => setSelectedStakeholder(null)}
              />
            </div>
          )}
        </section>
      </div>

      <aside className="space-y-4">
        <div className="p-4 bg-emerald-900/40 border border-emerald-800/60 rounded shadow-sm">
          <div className="text-sm text-emerald-300/90">Scenario Info</div>
          <div className="mt-2 text-sm">
            <div>Population: <span className="font-semibold text-emerald-100">{scenario.population}</span></div>
            <div>Baseline jobs: <span className="font-semibold text-emerald-100">{scenario.baseline_jobs}</span></div>
            <div className="mt-2 text-emerald-200/90">{scenario.summary}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}