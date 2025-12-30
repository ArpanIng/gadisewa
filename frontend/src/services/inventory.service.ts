import api from "./api";
import {
  type PaginatedPartList,
  type Part,
  type PartCreate,
} from "../schemas/inventory.schema";

export const getGaragesInventoryPart = async (): Promise<PaginatedPartList> => {
  const response = await api.get("/api/inventory/parts/");
  return response.data;
};

export const createGarageInventoryPart = async (
  data: PartCreate
): Promise<Part> => {
  const response = await api.post("/api/inventory/parts/", data);
  return response.data;
};

export const getGarageInventoryPartById = async (id: number): Promise<Part> => {
  const response = await api.get(`/api/inventory/parts/${id}/`);
  return response.data;
};

export const updateGarageInventoryPart = async (
  id: number,
  data: PartCreate
): Promise<Part> => {
  const response = await api.put(`/api/inventory/parts/${id}/`, data);
  return response.data;
};

export const deleteGarageInventoryPart = async (id: number): Promise<void> => {
  return await api.delete(`/api/inventory/parts/${id}/`);
};
