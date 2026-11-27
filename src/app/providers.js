"use client";

import { AlertsProvider } from "@/context/AlertsContext";
import { ToastProvider } from "@/context/ToastContext";

/** Client-side providers shared by every page. */
export default function Providers({ children }) {
  return (
    <ToastProvider>
      <AlertsProvider>{children}</AlertsProvider>
    </ToastProvider>
  );
}