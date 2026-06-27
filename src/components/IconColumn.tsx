import { apps } from "../data/apps";
import { ABOUT_TEXT } from "../data/fileContent";
import { useWindowStore } from "../store/useWindowStore";

export default function IconColumn() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="absolute left-6 top-10 flex flex-col gap-8">
      {apps.map((app) => (
        <div
          key={app.id}
          onClick={() => {
          switch (app.id) {
            case "files":
              openWindow("files", "Files");
              break;

            case "terminal":
              openWindow("terminal", "Terminal");
              break;

            case "system":
              openWindow("system", "System Monitor");
              break;

            case "resume":
              openWindow("pdf", "Resume.pdf", "/assets/resume.pdf");
              break;

            case "about":
              openWindow("textfile","About.txt",ABOUT_TEXT);
                break;
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