import { useWindowStore } from "../store/useWindowStore";
import Window from "../components/Window";
import IconColumn from "../components/IconColumn";
import HelpWidget from "../components/HelpWidget";

export default function Desktop() {
  const windows = useWindowStore((s) => s.windows);

  const hasWindows = windows.length > 0;

  return (
    <div className="w-screen h-screen relative overflow-hidden animate-fadeIn">

      {/* BACKGROUND */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          hasWindows ? "blur-[2px] brightness-50" : ""
        }`}
      >
        <div className="absolute inset-0 bg-black" />

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00ff6630_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      {/* DESKTOP LAYER */}
      <div className="relative z-10 w-screen h-screen">
        <IconColumn />

        {windows.map((w) => (
          <Window key={w.id} window={w} />
        ))}

        <HelpWidget />
      </div>
    </div>
  );
}