"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "@/components/ui/Toast.module.css";

const ToastContext = createContext(null);

/** Shows one short message at the bottom of the screen. */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), 5000);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const value = useMemo(() => ({ showToast }), [showToast]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div className={${styles.toast} ${toast.type === "error" ? styles.error : ""}} role="status">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}