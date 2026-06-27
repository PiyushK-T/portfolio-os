import { create } from "zustand";

export type SystemLog = {
  time: string;
  message: string;
};

type SystemState = {
  logs: SystemLog[];
  addLog: (message: string) => void;
  clearLogs: () => void;
};

const formatTime = () =>
  new Date().toLocaleTimeString("en-GB", {
    hour12: false,
  });

export const useSystemStore = create<SystemState>((set) => ({
  logs: [
    { time: formatTime(), message: "System boot initialized" },
    { time: formatTime(), message: "Desktop environment loaded" },
  ],

  addLog: (message) =>
    set((state) => ({
      logs: [
        ...state.logs,
        {
          time: formatTime(),
          message,
        },
      ],
    })),

  clearLogs: () => set({ logs: [] }),
}));