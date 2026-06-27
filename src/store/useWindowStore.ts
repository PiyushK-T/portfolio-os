import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { useSystemStore } from "./useSystemStore";

// helper for positioning windows randomly on screen, but fully visible
function randomPosition(vw: number, vh: number) {
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const minX = 120;          // clear left icon column (~24px left + 48px icon + padding)
  const minY = 40;           // clear top
  const maxX = Math.max(minX, screenW - vw - 170); // clear bottom-right help widget
  const maxY = Math.max(minY, screenH - vh - 120); // clear bottom-right help widget + taskbar

  return {
    x: Math.round(minX + Math.random() * (maxX - minX)),
    y: Math.round(minY + Math.random() * (maxY - minY)),
  };
}

export type WindowType =
  | "files"
  | "textfile"
  | "terminal"
  | "system"
  | "pdf";

export type WindowItem = {
  id: string;
  type: WindowType;
  title: string;
  x: number;
  y: number;
  zIndex: number;
  content?: string;
  startPath?: string[];
};

type Store = {
  windows: WindowItem[];
  textfileCount: number;

  openWindow: (
    type: WindowType,
    title: string,
    content?: string,
    startPath?: string[]
  ) => void;

  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
};

// useSystemStore.getState().addLog("message here");

export const useWindowStore = create<Store>((set, get) => ({
  windows: [],
  textfileCount: 0,

  openWindow: (type, title, content, startPath) => {
  const existing = get().windows.find(
    (w) => w.type === type && w.title === title
  );
  if (existing) {
    useSystemStore.getState().addLog(`Window already open: ${title}`);
    return;
  }

  const id = uuid();
  const allWindows = get().windows;
  const maxZ = allWindows.reduce((m, w) => Math.max(m, w.zIndex), 0);

  const vw = window.innerWidth * 0.6;
  const vh = window.innerHeight * 0.6;
  const { x, y } = randomPosition(vw, vh);

  set({
    windows: [
      ...allWindows,
      { id, type, title, x, y, zIndex: maxZ + 1, content, startPath },
    ],
    textfileCount:
      type === "textfile" ? get().textfileCount + 1 : get().textfileCount,
  });

  useSystemStore.getState().addLog(`Window opened: ${title} (${type})`);
},

  closeWindow: (id) => {
    const win = get().windows.find((w) => w.id === id);

    set({
      windows: get().windows.filter((w) => w.id !== id),
    });

    if (win) {
      useSystemStore.getState().addLog(
  `Window closed: ${win.title} (${win.type})`
);
    }
  },

  focusWindow: (id) => {
    const allWindows = get().windows;
    const maxZ = allWindows.reduce((m, w) => Math.max(m, w.zIndex), 0);

    const win = allWindows.find((w) => w.id === id);

    // prevent duplicate focus logging
    const isAlreadyTop = win?.zIndex === maxZ;

    set({
      windows: allWindows.map((w) =>
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      ),
    });

    if (win && !isAlreadyTop) {
      useSystemStore.getState().addLog(
        `Window focused: ${win.title}`
      );
    }
  },
}));