import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import scenarios from "../../data/scenarios.json";
import ScenarioView from "../../components/ScenarioView";

export default function ScenarioPage() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === String(id));

  return (
    <>
      <Head>
        <title>{scenario ? `${scenario.title} • Impact Sandbox` : "Scenario • Impact Sandbox"}</title>
      </Head>
      <main className="min-h-screen game-surface max-w-6xl mx-auto px-6 py-8">
        <div className="mb-4">
          <Link href="/dashboard" legacyBehavior passHref>
            <a className="text-sm text-emerald-300 hover:underline">← Back to Dashboard</a>
          </Link>
        </div>

        {!scenario ? (
          <div className="bg-emerald-900/40 border border-emerald-800/60 rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-emerald-100">Scenario not found</h1>
            <p className="mt-2 text-emerald-200/90">We couldn't find a scenario with id "{id}".</p>
          </div>
        ) : (
          <ScenarioView scenario={scenario} />
        )}
      </main>
    </>
  );
}