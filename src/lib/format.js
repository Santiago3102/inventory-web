/** Small pure helpers shared by the components. */

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: false });
}

/** Same rule as the backend alerts: current stock at or below the minimum. */
export function isLowStock(product) {
  return product.current_stock <= product.minimum_stock;
}

const SWATCHES = ["#ddd8cc", "#d8a85a", "#e2dfd8", "#4a3b34", "#55554f", "#b9c4b4", "#c9b8b0"];

/** The API has no product images, so each product gets a stable neutral color square. */
export function swatchColor(productId) {
  return SWATCHES[productId % SWATCHES.length];
}