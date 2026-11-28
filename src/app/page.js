"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DeleteProductModal from "@/components/products/DeleteProductModal";
import MovementModal from "@/components/products/MovementModal";
import ProductTable from "@/components/products/ProductTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { PlusIcon, SearchIcon } from "@/components/ui/Icons";
import LoadingBlock from "@/components/ui/LoadingBlock";
import PageHeader from "@/components/ui/PageHeader";
import { useAlerts } from "@/context/AlertsContext";
import { useToast } from "@/context/ToastContext";
import { useProducts } from "@/hooks/useProducts";
import { isLowStock } from "@/lib/format";

export default function ProductsPage() {
  const { products, loading, error, reload } = useProducts();
  const { reload: reloadAlerts } = useAlerts();
  const { showToast } = useToast();

  const [onlyLow, setOnlyLow] = useState(false);
  const [query, setQuery] = useState("");
  // modal = { kind: "delete" | "ENTRY" | "EXIT", product }
  const [modal, setModal] = useState(null);

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesTab = !onlyLow || isLowStock(product);
      const matchesText = !text || `${product.name} ${product.sku}`.toLowerCase().includes(text);
      return matchesTab && matchesText;
    });
  }, [products, onlyLow, query]);

  async function handleDone(message) {
    setModal(null);
    showToast(message);
    await Promise.all([reload(), reloadAlerts()]);
  }

  return (
    <>
      <PageHeader eyebrow="Gestión de inventario" title="Productos">
        <Link href="/products/new" className="btn btn-ink d-inline-flex align-items-center gap-2">
          <PlusIcon /> Nuevo producto
        </Link>
      </PageHeader>

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <div className="position-relative flex-grow-1" style={{ maxWidth: 400 }}>
          <span className="position-absolute muted" style={{ left: 14, top: 11 }}><SearchIcon /></span>
          <input type="search" className="field-input" style={{ paddingLeft: 44 }}
            placeholder="Buscar por nombre o SKU" aria-label="Buscar producto"
            value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="d-flex align-items-center gap-3" style={{ fontSize: 12 }}>
          <button type="button" className={`link-action ${!onlyLow ? "fw-bold" : ""}`} onClick={() => setOnlyLow(false)}>
            Todos
          </button>
          <button type="button" className={`link-action ${onlyLow ? "fw-bold" : ""}`} onClick={() => setOnlyLow(true)}>
            Stock bajo
          </button>
          <span className="muted">| {visible.length} {visible.length === 1 ? "producto" : "productos"}</span>
        </div>
      </div>

      <div className="panel">
        {loading && <LoadingBlock label="Cargando productos…" />}
        {!loading && error && <ErrorMessage message={error} onRetry={reload} />}
        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <strong>Aún no hay productos</strong>
            <p>Crea el primero para empezar a controlar tu stock.</p>
            <Link href="/products/new" className="btn btn-ink">+ Nuevo producto</Link>
          </div>
        )}
        {!loading && !error && products.length > 0 && visible.length === 0 && (
          <div className="empty-state">
            <strong>No se encontraron productos</strong>
            Prueba con otro nombre o código SKU.
          </div>
        )}
        {!loading && !error && visible.length > 0 && (
          <ProductTable
            products={visible}
            onEntry={(product) => setModal({ kind: "ENTRY", product })}
            onExit={(product) => setModal({ kind: "EXIT", product })}
            onDelete={(product) => setModal({ kind: "delete", product })}
          />
        )}
      </div>

      {modal?.kind === "delete" && (
        <DeleteProductModal product={modal.product} onClose={() => setModal(null)} onDeleted={handleDone} />
      )}
      {(modal?.kind === "ENTRY" || modal?.kind === "EXIT") && (
        <MovementModal product={modal.product} type={modal.kind}
          onClose={() => setModal(null)} onSaved={handleDone} />
      )}
    </>
  );
}