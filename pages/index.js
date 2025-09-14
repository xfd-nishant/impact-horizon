import Link from "next/link";
import scenarios from "../data/scenarios.json";
import Head from "next/head";

function ScenarioCard({ s }) {
  return (
    <Link
      href={`/scenario/${s.id}`}
      className="block border rounded-lg p-4 bg-white hover:shadow-lg transition"
    >
      <div className="font-semibold text-lg">{s.title}</div>
      <div className="text-sm text-gray-600 mt-1">{s.summary}</div>
      <div className="mt-3 text-xs text-gray-500">
        Population: {s.population} • Jobs: {s.baseline_jobs}
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Impact Sandbox</title>
      </Head>
      <main className="max-w-5xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Impact Sandbox</h1>
          <p className="text-gray-600 mt-2">Make a decision, chat with stakeholders, guess impacts, and see what happens.</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Scenarios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scenarios.map((s) => (
              <ScenarioCard key={s.id} s={s} />
            ))}
          </div>
        </section>

        <footer className="mt-12 text-sm text-gray-500">
          Tip: click a scenario to start. For the hackathon demo, use scenario 1 as your golden demo.
        </footer>
      </main>
    </>
  );
}
