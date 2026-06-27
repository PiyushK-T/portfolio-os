import { useEffect, useState } from "react";

const logs = [
  "[OK] Initializing kernel...",
  "[OK] Mounting file system...",
  "[OK] Loading UI modules...",
  "[OK] Starting window manager...",
  "[OK] Connecting local profile...",
  "[OK] Rendering desktop environment...",
];

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (index < logs.length) {
      const t = setTimeout(() => setIndex(index + 1), 500);
      return () => clearTimeout(t);
    }

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 600);
          return 100;
        }
        return p + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="w-screen h-screen bg-black text-[#00ff66] font-mono flex flex-col justify-center items-center">
      
      {/* LOG AREA */}
      <div className="w-[600px] text-xs space-y-1 mb-6">
        {logs.slice(0, index).map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div className="w-[600px] border border-[#00ff66]/40 h-4">
        <div
          className="h-full bg-[#00ff66] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-xs mt-3 opacity-70">
        booting portfolio OS...
      </div>
    </div>
  );
}