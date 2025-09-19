import Head from "next/head";
import { useRouter } from "next/router";
import scenarios from "../../../data/scenarios.json";
import ScenarioBriefing from "../../../components/ScenarioBriefing";

export default function BriefingPage() {
  const router = useRouter();
  const { id } = router.query;
  const scenario = scenarios.find((s) => s.id === String(id));

  if (!scenario) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-forest-100">Scenario not found</h1>
          <p className="text-forest-400 mt-2">The requested scenario could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{scenario.title} - Briefing • Impact Sandbox</title>
      </Head>
      <ScenarioBriefing scenario={scenario} />
    </>
  );
}