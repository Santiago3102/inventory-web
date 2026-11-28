"use client";

import { useCallback, useEffect, useState } from "react";
import { productService } from "@/services/productService";

/** Loads the product list once and exposes `reload` to refresh it after a change. */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(
    () =>
      productService
        .list()
        .then((data) => {
          setProducts(data);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false)),
    []
  );

  useEffect(() => {
    reload();
  }, [reload]);

  return { products, loading, error, reload };
}