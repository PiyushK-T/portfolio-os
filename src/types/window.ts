import type { AppType } from "./app";

export interface WindowData {
  id: string;
  type: AppType;
  title: string;
  x: number;
  y: number;
  zIndex: number;
}