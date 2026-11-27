"use client";

import { useEffect, useState } from "react";

/**
 * Message for the first load. After a few seconds it explains the delay:
 * the free Render server sleeps when nobody uses it.
 */
export default function LoadingBlock({ label = "Cargando…" }) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="empty-state" role="status">
      {label}
      {slow && (
        <div className="mt-2">
          El servidor puede estar despertando. Esto tarda hasta un minuto la primera vez.
        </div>
      )}
    </div>
  );
}