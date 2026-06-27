import { apps } from "../data/apps";
import { useWindowStore } from "../store/useWindowStore";

export default function IconColumn() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="absolute left-6 top-10 flex flex-col gap-8">
      {apps.map((app) => (
        <div
          key={app.id}
          onClick={() => {
            if (app.id === "files") {
              openWindow("files", "Files");
            }
            if (app.id === "terminal") {
              openWindow("terminal", "Terminal");
            }
          }}
          className="flex flex-col items-center cursor-pointer group"
        >
          <img
            src={app.icon}
            className="w-12 h-12 image-rendering: pixelated glow"
          />

          <span className="text-[12px] text-[#00ff66] mt-1 opacity-80 group-hover:opacity-100">
            {app.name}
          </span>
        </div>
      ))}
    </div>
  );
}