import { api } from "@/lib/apiClient";

export const alertService = {
  list: () => api("/alerts"),
};