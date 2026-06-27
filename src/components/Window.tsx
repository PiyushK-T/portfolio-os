import { motion } from "framer-motion";
import clsx from "clsx";
import { useWindowStore } from "../store/useWindowStore";
import WindowRegistry from "./window/WindowRegistry";

export default function Window({ window }: any) {
  const { closeWindow, focusWindow } = useWindowStore();

  const isTopWindow = window.zIndex === Math.max(window.zIndex, 1);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={() => focusWindow(window.id)}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: isTopWindow ? 1 : 0.97,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
      className={clsx(
        "absolute w-[600px] h-[420px]",
        "bg-black border text-[#00ff66]",
        "overflow-hidden select-none",
        "shadow-[0_0_18px_#00ff6640]",
        isTopWindow
          ? "border-[#00ff66]/80 shadow-[0_0_25px_#00ff6655]"
          : "border-[#00ff66]/30 opacity-90"
      )}
      style={{
        left: window.x,
        top: window.y,
        zIndex: window.zIndex,
        fontFamily: '"HomeVideo", monospace',
      }}
    >
      {/* TITLE BAR */}
      <div
        className="flex justify-between items-center px-3 py-2 border-b border-[#00ff66]/40 cursor-move bg-black"
        onMouseDown={() => focusWindow(window.id)}
      >
        <span className="text-xs tracking-widest opacity-90">
          {window.title}
        </span>

        <button
          onClick={() => closeWindow(window.id)}
          className="text-[#00ff66] text-xs hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div
        className="h-[calc(100%-40px)] overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <WindowRegistry
          type={window.type}
          content={window.content}
          title={window.title}
        />
      </div>
    </motion.div>
  );
}