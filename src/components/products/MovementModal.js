"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { movementService } from "@/services/movementService";

/** Registers an entry (type "ENTRY") or an exit (type "EXIT") for one product. */
export default function MovementModal({ product, type, onClose, onSaved }) {
  const isEntry = type === "ENTRY";
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [fieldError, setFieldError] = useState(null);
  const [saving, setSaving] = useState(false);

  const amount = Number(quantity);
  const validAmount = quantity !== "" && Number.isInteger(amount) && amount > 0;
  const stockAfter = isEntry ? product.current_stock + amount : product.current_stock - amount;
  const sign = isEntry ? "+" : "−";
  // "—" when the exit is bigger than the stock: that movement would be refused.
  const preview = !validAmount ? ${product.current_stock} ${sign} cantidad : stockAfter < 0 ? "—" : stockAfter;

  async function submit(event) {
    event.preventDefault();
    if (!validAmount) {
      setFieldError("Ingresa una cantidad entera mayor a 0.");
      return;
    }
    setSaving(true);
    setFieldError(null);
    try {
      const register = isEntry ? movementService.registerEntry : movementService.registerExit;
      await register(product.id, amount, note.trim());
      onSaved(isEntry ? "Entrada registrada" : "Salida registrada");
    } catch (err) {
      setFieldError(err.message);
      setSaving(false);
    }
  }

  return (
    <Modal
      eyebrow="Movimiento de inventario"
      title={isEntry ? "Registrar entrada" : "Registrar salida"}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-line" onClick={onClose}>Cancelar</button>
          <button type="submit" form="movement-form" className="btn btn-ink" disabled={saving}>
            {saving ? "Guardando…" : "Confirmar"}
          </button>
        </>
      }
    >
      <form id="movement-form" onSubmit={submit} noValidate>
        <label className="field-label" htmlFor="movement-product">Producto</label>
        <input id="movement-product" className="field-input" value={product.name} disabled />
        <span className="field-hint">SKU {product.sku} · Stock actual: {product.current_stock}</span>

        <div className="mt-4">
          <label className="field-label" htmlFor="quantity">Cantidad *</label>
          <input
            id="quantity"
            type="number"
            min="1"
            step="1"
            placeholder="0"
            className={field-input ${fieldError ? "invalid" : ""}}
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
              setFieldError(null);
            }}
            autoFocus
          />
          {fieldError && <span className="field-error" role="alert">{fieldError}</span>}
        </div>

        <div className="mt-4">
          <label className="field-label" htmlFor="note">Nota (opcional)</label>
          <input id="note" className="field-input" value={note} maxLength={255}
            onChange={(event) => setNote(event.target.value)} />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4 p-3"
          style={{ background: "var(--head)", fontSize: 12 }}>
          <span className="muted">Stock después del movimiento</span>
          <strong>{preview}</strong>
        </div>
      </form>
    </Modal>
  );
}