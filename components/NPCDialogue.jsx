import { useEffect, useState } from "react";

export default function NPCDialogue({ lines = [] }) {
  const [index, setIndex] = useState(0);
  const isLast = index >= lines.length - 1;

  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div className="bg-emerald-900/40 border border-emerald-800/60 rounded-lg p-4">
      <div className={`min-h-[64px] transition-opacity ${visible ? "opacity-100" : "opacity-0"}`}>
        <div className="text-emerald-200/90">
          {lines[index] || ""}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-emerald-300/70">NPC briefing</div>
        <button
          onClick={() => setIndex((i) => Math.min(i + 1, lines.length - 1))}
          className="px-3 py-1 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-500 transition disabled:opacity-50"
          disabled={isLast}
        >
          {isLast ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
}