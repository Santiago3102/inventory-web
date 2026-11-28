import Link from "next/link";
import { isLowStock, swatchColor } from "@/lib/format";
import styles from "./ProductTable.module.css";

function StatusChip({ product }) {
  if (product.current_stock === 0) return <span className="chip chip-alert">Agotado</span>;
  if (isLowStock(product)) return <span className="chip chip-alert">Alerta</span>;
  return <span className="chip">En stock</span>;
}

/** Product list with the per-row actions. It only draws; the page owns the logic. */
export default function ProductTable({ products, onEntry, onExit, onDelete }) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>SKU</th>
            <th>Stock actual</th>
            <th>Stock mínimo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.name}>
                  <span className={styles.swatch} style={{ background: swatchColor(product.id) }} />
                  {product.name}
                </div>
              </td>
              <td>
                <span className="sku-chip">{product.sku}</span>
              </td>
              <td>
                <strong>{product.current_stock}</strong> <span className="muted">uds.</span>
              </td>
              <td>
                {product.minimum_stock} <span className="muted">uds.</span>
              </td>
              <td>
                <StatusChip product={product} />
              </td>
              <td className={styles.actions}>
                <Link href={`/products/${product.id}/edit`} className="link-action">Editar</Link>
                <button type="button" className="link-action danger" onClick={() => onDelete(product)}>Eliminar</button>
                <button type="button" className="link-action" onClick={() => onEntry(product)}>Entrada</button>
                <button type="button" className="link-action" onClick={() => onExit(product)}>Salida</button>
                <Link href={`/history/${product.id}`} className="link-action">Historial</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}