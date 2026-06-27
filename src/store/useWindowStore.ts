import { create } from "zustand";
import { v4 as uuid } from "uuid";

// export type WindowType = "files" | "textfile";
export type WindowType =
   "files" | "textfile" | "terminal";

export type WindowItem = {
  id: string;
  type: WindowType;
  title: string;
  x: number;
  y: number;
  zIndex: number;
  content?: string;
};

type Store = {
  windows: WindowItem[];
  textfileCount: number;
  openWindow: (type: WindowType, title: string, content?: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
};

export const useWindowStore = create<Store>((set, get) => ({
  windows: [],
  textfileCount: 0,
  openWindow: (type, title, content) => {
    const id = uuid();
    const allWindows = get().windows;
    const maxZ = allWindows.reduce((max, w) => Math.max(max, w.zIndex), 0);

    const vw = window.innerWidth * 0.6;
    const vh = window.innerHeight * 0.6;

    let x: number;
    let y: number;

    if (type === "files") {
      // slightly left of center
      x = Math.round((window.innerWidth - vw) / 2 - 200);
      y = Math.round((window.innerHeight - vh) / 2 - 100);
    } 
    else if (type === "terminal") {
      x = Math.round((window.innerWidth - vw) / 2 - 100);
      y = Math.round((window.innerHeight - vh) / 2 - 50);
    }
    else {
      // cascade: offset each new textfile by 30px
      const count = get().textfileCount;
      x = Math.round((window.innerWidth - vw) / 2 + 80 + count * 30);
      y = Math.round((window.innerHeight - vh) / 2 + 60 + count * 40);
    }

    set({
      windows: [
        ...allWindows,
        { id, type, title, x, y, zIndex: maxZ + 1, content },
      ],
      textfileCount: type === "textfile" ? get().textfileCount + 1 : get().textfileCount,
    });
  },
  closeWindow: (id) =>
    set({ windows: get().windows.filter((w) => w.id !== id) }),
  focusWindow: (id) =>
    set({
      windows: get().windows.map((w) => {
        const maxZ = get().windows.reduce((max, w) => Math.max(max, w.zIndex), 0);
        return w.id === id ? { ...w, zIndex: maxZ + 1 } : w;
      }),
    }),
}));