import { useEffect, useRef, useState, useMemo } from "react";
import { useSystemStore } from "../../../store/useSystemStore";
import { useWindowStore } from "../../../store/useWindowStore";

type Tab =
  | "overview"
  | "logs"
  | "developer"
  | "hardware"
  | "network"
  | "about";

export default function SystemApp() {
  const [tab, setTab] = useState<Tab>("overview");

  const logs = useSystemStore((s) => s.logs);
  const windows = useWindowStore((s) => s.windows);

  const [time, setTime] = useState(new Date());

  const didLogOpen = useRef(false);

  // ✅ HARD DEDUPE (survives StrictMode + remounts)
  useEffect(() => {
    if (didLogOpen.current) return;
    didLogOpen.current = true;

    useSystemStore.getState().addLog("System monitor opened");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const uptime = useMemo(() => {
    const start = Number(sessionStorage.getItem("bootTime") || Date.now());
    sessionStorage.setItem("bootTime", String(start));

    const diff = Date.now() - start;
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hrs = Math.floor(min / 60);

    return `${hrs.toString().padStart(2, "0")}:${(min % 60)
      .toString()
      .padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;
  }, [time]);

  const TabButton = ({ id, label }: any) => (
    <button
      onClick={() => setTab(id)}
      className={`px-2 py-1 text-xs border ${
        tab === id
          ? "border-[#00ff66] bg-[#00ff6630]"
          : "border-[#00ff66]/20"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      className="h-full flex flex-col text-[#00ff66]"
      style={{ fontFamily: '"HomeVideo", monospace' }}
    >
      {/* HEADER */}
      <div className="border-b border-[#00ff66]/30 p-2 text-xs flex justify-between">
        <span>SYSTEM MONITOR</span>
        <span>{time.toLocaleTimeString()}</span>
      </div>

      {/* TABS */}
      <div className="flex gap-2 p-2 border-b border-[#00ff66]/20">
        <TabButton id="overview" label="Overview" />
        <TabButton id="logs" label="Logs" />
        <TabButton id="developer" label="Developer" />
        <TabButton id="hardware" label="Hardware" />
        <TabButton id="network" label="Network" />
        <TabButton id="about" label="About" />
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-3 text-xs whitespace-pre-wrap">
        {tab === "overview" && (
          <div className="space-y-2">
            <div>Status: ONLINE</div>
            <div>Uptime: {uptime}</div>
            <div>Open Windows: {windows.length}</div>
            <div>Session Time: {time.toLocaleTimeString()}</div>
          </div>
        )}

        {tab === "logs" && (
          <div className="space-y-1">
            {logs.map((l, i) => (
              <div key={i}>
                [{l.time}] {l.message}
              </div>
            ))}
          </div>
        )}

        {tab === "developer" && (
          <div className="space-y-1">
            <div>Piyush Kataktalware</div>
            <div>Full Stack Developer</div>
            <div>React • Node • TypeScript • Docker • Kubernetes</div>
            <div>Based in New Jersey</div>
          </div>
        )}

        {tab === "hardware" && (
          <div className="space-y-1">
            <div>Browser: {navigator.userAgent}</div>
            <div>Platform: {navigator.platform}</div>
            <div>
              Screen: {window.screen.width} x {window.screen.height}
            </div>
            <div>
              Viewport: {window.innerWidth} x {window.innerHeight}
            </div>
            <div>Language: {navigator.language}</div>
            <div>DPR: {window.devicePixelRatio}</div>
          </div>
        )}

        {tab === "network" && (
          <div className="space-y-1">
            <div>Status: ONLINE</div>
            <div>
              Connection: {navigator.onLine ? "ACTIVE" : "OFFLINE"}
            </div>
            <div>
              Latency: ~{Math.floor(Math.random() * 50)}ms
            </div>
            <div>Requests: {logs.length * 3}</div>
          </div>
        )}

        {tab === "about" && (
          <div className="space-y-1">
            <div>Portfolio OS v1.0</div>
            <div>React + TypeScript + Zustand</div>
            <div>Framer Motion Window Manager</div>
            <div>Virtual File System</div>
            <div>CRT Green Theme</div>
          </div>
        )}
      </div>
    </div>
  );
}