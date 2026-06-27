import helpIcon from "../assets/ui/help.png";

export default function HelpWidget() {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col items-end">
      
      {/* Button */}
      <button className="group flex items-center gap-2">
        
        <span className="text-neon text-sm opacity-90 group-hover:opacity-100">
            Can I help you?
        </span>
        <img
          src={helpIcon}
          alt="help"
          className="
            w-14 h-14
            cursor-pointer
            glow
            hover:scale-110
            transition
            "
        />
      </button>

    </div>
  );
}