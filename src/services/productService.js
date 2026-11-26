import { api } from "@/lib/apiClient";

export const productService = {
  list: () => api("/products"),
  get: (id) => api(`/products/${id}`),
  create: (data) => api("/products", { method: "POST", body: data }),
  update: (id, data) => api(`/products/${id}`, { method: "PUT", body: data }),
  remove: (id) => api(`/products/${id}`, { method: "DELETE" }),
};