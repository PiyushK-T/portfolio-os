import { fileIcons } from "../data/fileIcons";

export default function HelpWidget() {
  return (
    <div className="absolute bottom-6 right-6">
      <button className="group flex flex-col items-center gap-2">
        <img
          src={fileIcons.image}
          alt="Help"
          className="w-20 h-20 object-contain pixel-icon cursor-pointer transition-transform duration-200 group-hover:scale-105"
        />

        <span className="text-neon text-sm opacity-90 group-hover:opacity-100 text-center">
          Can I help you?
        </span>
      </button>
    </div>
  );
}