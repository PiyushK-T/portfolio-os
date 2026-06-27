export default function DesktopIcon({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <img
        src={icon}
        className="w-10 h-10 image-rendering: pixelated glow"
      />
      <span className="text-[10px] text-neon mt-1">{label}</span>
    </div>
  );
}