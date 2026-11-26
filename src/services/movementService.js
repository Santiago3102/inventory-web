import { api } from "@/lib/apiClient";

export const movementService = {
  registerEntry: (productId, quantity, note) =>
    api("/movements/entries", {
      method: "POST",
      body: { product_id: productId, quantity, note: note || null },
    }),
  registerExit: (productId, quantity, note) =>
    api("/movements/exits", {
      method: "POST",
      body: { product_id: productId, quantity, note: note || null },
    }),
};