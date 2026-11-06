import api from "./api";
export const getCouriers = () => api.get("/couriers");
export const bookShipment = (data) => api.post("/shipments/book", data);
export const trackShipment = (trackingNumber) =>
  api.get(`/shipments/${trackingNumber}`);
