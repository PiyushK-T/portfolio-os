import { useSystemStore } from "../store/useSystemStore";

export function useSystemLogger() {

// useSystemStore.getState().addLog("event");

  const log = (message: string) => {
    useSystemStore.getState().addLog(message);
  };

  return { log };
}