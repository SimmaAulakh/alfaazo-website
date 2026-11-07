"use client";

import { useSyncExternalStore } from "react";
import { detectPlatform, type Platform } from "./analytics";

const subscribe = () => () => {};
const getSnapshot = (): Platform | null => detectPlatform();
// Null on the server and during hydration so both sides render the same markup;
// callers fall back to the homepage download section until the platform is known.
const getServerSnapshot = (): Platform | null => null;

export function usePlatform(): Platform | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
