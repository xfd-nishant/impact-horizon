import Link from "next/link";

export default function ScenarioCard({ scenario }) {
  return (
    <Link
      href={`/scenario/${scenario.id}`}
      className="block rounded-xl border bg-white p-5 shadow-sm transition duration-200 hover:shadow-lg hover:scale-[1.01]"
    >
      <div className="font-semibold text-lg text-gray-900">{scenario.title}</div>
      <p className="mt-1 text-sm text-gray-600">{scenario.summary}</p>
      <div className="mt-3 text-xs text-gray-500">
        Population: {scenario.population} • Jobs: {scenario.baseline_jobs}
      </div>
    </Link>
  );
}