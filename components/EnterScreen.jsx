import Link from "next/link";

export default function EnterScreen() {
  return (
    <main className="min-h-screen game-surface flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-emerald-100 drop-shadow">
          Impact Sandbox
        </h1>
        <p className="mt-4 text-emerald-200/90 max-w-2xl mx-auto">
          Act as a decision-maker. Chat with stakeholders. Guess impacts.
        </p>
        <Link href="/dashboard" legacyBehavior passHref>
          <a className="inline-block mt-10 px-8 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-md hover:bg-emerald-500 hover:shadow-lg transition">
            Enter Game
          </a>
        </Link>
      </div>
    </main>
  );
}