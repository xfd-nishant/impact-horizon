import { useRouter } from "next/router";
import scenarios from "../../data/scenarios.json";
import Head from "next/head";
import ChatPanel from "../../components/ChatPanel";
import GuessForm from "../../components/GuessForm";
import OutcomeReveal from "../../components/OutcomeReveal";
import { evaluateGuess } from "../../lib/scoring";
import { useState } from "react";

export default function ScenarioPage() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === id) || scenarios[0];
  const [lastResult, setLastResult] = useState(null);

  return (
    <>
      <Head>
        <title>{scenario.title} • Impact Sandbox</title>
      </Head>
      <main className="max-w-5xl mx-auto p-6">
        <button className="text-sm text-indigo-600 mb-4" onClick={() => router.push("/")}>← Back</button>
        <h1 className="text-2xl font-bold">{scenario.title}</h1>
        <p className="text-gray-600 mt-1">{scenario.summary}</p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatPanel scenarioId={scenario.id} personaList={Object.keys(scenario.personaGoals || {})} />
          </div>

          <aside className="space-y-4">
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">Intel</div>
              <div className="mt-2 text-sm">Population: {scenario.population}</div>
              <div className="text-sm">Baseline jobs: {scenario.baseline_jobs}</div>
            </div>

            <div className="p-4 bg-white rounded shadow">
              <GuessForm
                onSubmit={(guess, explanation) => {
                  const res = evaluateGuess(guess, scenario);
                  setLastResult({ guess, explanation, ...res });
                }}
              />
            </div>
          </aside>
        </div>

        {lastResult && (
          <div className="mt-6">
            <OutcomeReveal guess={lastResult.guess} actual={lastResult.actual} score={lastResult.score} explanation={lastResult.explanation} />
          </div>
        )}
      </main>
    </>
  );
}
