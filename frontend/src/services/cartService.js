import api from "./api";
export const getCart = () => api.get("/cart");
export const saveCart = (items) => api.put("/cart", { items });
