"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { alertService } from "@/services/alertService";

const AlertsContext = createContext(null);

/**
 * Shares the low-stock alerts with the navbar badge and the alerts page.
 * Call reload() after any change that can modify the stock.
 */
export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(
    () =>
      alertService
        .list()
        .then((data) => {
          setAlerts(data);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false)),
    []
  );

  useEffect(() => {
    reload();
  }, [reload]);

  const value = useMemo(() => ({ alerts, loading, error, reload }), [alerts, loading, error, reload]);
  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>;
}

export function useAlerts() {
  return useContext(AlertsContext);
}