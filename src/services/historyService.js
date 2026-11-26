import { api } from "@/lib/apiClient";

export const historyService = {
  byProduct: (productId) => api(`/history/${productId}`),
};