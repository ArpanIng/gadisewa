import api from "./api";
import {
  type PaginatedAppointmentList,
  type Appointment,
  type AppointmentCreate,
} from "../schemas/appointments.schema";
import {
  type PaginatedGarageList,
  type Garage,
  type GarageCreate,
  type PaginatedServiceList,
  type Service,
  type ServiceCreate,
  type PaginatedVehicleList,
  type VehicleCreate,
  type Vehicle,
} from "../schemas/garages.schema";
import type {
  Category,
  CategoryCreate,
  PaginatedCategoryList,
  PaginatedSupplierList,
  Supplier,
  SupplierCreate,
} from "../schemas/inventory.schema";

/**
 * Garage API services
 */
export const getGarages = async (): Promise<PaginatedGarageList> => {
  const response = await api.get("/api/garages/");
  return response.data;
};

export const createGarage = async (data: GarageCreate): Promise<Garage> => {
  const response = await api.post("/api/garages/", data);
  return response.data;
};

export const getGarageById = async (id: number): Promise<Garage> => {
  const response = await api.get(`/api/garages/${id}/`);
  return response.data;
};

export const updateGarage = async (
  id: number,
  data: GarageCreate
): Promise<Garage> => {
  const response = await api.put(`/api/garages/${id}/`, data);
  return response.data;
};

export const deleteGarage = async (id: number): Promise<void> => {
  return await api.delete(`/api/garages/${id}/`);
};

/**
 * Garage vehicle API services
 */
export const getGarageVehicles = async (): Promise<PaginatedVehicleList> => {
  const response = await api.get("/api/vehicles/");
  return response.data;
};

export const createGarageVehicle = async (
  data: VehicleCreate
): Promise<Vehicle> => {
  const response = await api.post("/api/vehicles/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getGarageVehicleById = async (id: number): Promise<Vehicle> => {
  const response = await api.get(`/api/vehicles/${id}/`);
  return response.data;
};

export const updateGarageVehicle = async (
  id: number,
  data: VehicleCreate
): Promise<Vehicle> => {
  const response = await api.put(`/api/vehicles/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteGarageVehicle = async (id: number): Promise<void> => {
  return await api.delete(`/api/vehicles/${id}/`);
};

/**
 * Garage category API services
 */
export const getGarageCategories = async (): Promise<PaginatedCategoryList> => {
  const response = await api.get("/api/categories/");
  return response.data;
};

export const createGarageCategory = async (
  data: CategoryCreate
): Promise<Category> => {
  const response = await api.post("/api/categories/", data);
  return response.data;
};

export const getGarageCategoryById = async (id: number): Promise<Category> => {
  const response = await api.get(`/api/categories/${id}/`);
  return response.data;
};

export const updateGarageCategory = async (
  id: number,
  data: CategoryCreate
): Promise<Category> => {
  const response = await api.put(`/api/categories/${id}/`, data);
  return response.data;
};

export const deleteGarageCategory = async (id: number): Promise<void> => {
  return await api.delete(`/api/categories/${id}/`);
};

/**
 * Garage service API services
 */
export const getGarageServices = async (): Promise<PaginatedServiceList> => {
  const response = await api.get("/api/services/");
  return response.data;
};

export const createGarageService = async (
  data: ServiceCreate
): Promise<Service> => {
  const response = await api.post("/api/services/", data);
  return response.data;
};

export const getGarageServiceById = async (id: number): Promise<Service> => {
  const response = await api.get(`/api/services/${id}/`);
  return response.data;
};

export const updateGarageService = async (
  id: number,
  data: ServiceCreate
): Promise<Service> => {
  const response = await api.put(`/api/services/${id}/`, data);
  return response.data;
};

export const deleteGarageService = async (id: number): Promise<void> => {
  return await api.delete(`/api/services/${id}/`);
};

/**
 * Garage appointment API services
 */
export const getGarageAppointments =
  async (): Promise<PaginatedAppointmentList> => {
    const response = await api.get("/api/appointments/");
    return response.data;
  };

export const createGarageAppointment = async (
  data: AppointmentCreate
): Promise<Appointment> => {
  const response = await api.post("/api/appointments/", data);
  return response.data;
};

export const getGarageAppointmentById = async (
  id: number
): Promise<Appointment> => {
  const response = await api.get(`/api/appointments/${id}/`);
  return response.data;
};

export const updateGarageAppointment = async (
  id: number,
  data: AppointmentCreate
): Promise<Appointment> => {
  const response = await api.put(`/api/appointments/${id}/`, data);
  return response.data;
};

export const deleteGarageAppointment = async (id: number): Promise<void> => {
  return await api.delete(`/api/appointments/${id}/`);
};

/**
 * Garage supplier API services
 */
export const getGarageSuppliers = async (): Promise<PaginatedSupplierList> => {
  const response = await api.get("/api/suppliers/");
  return response.data;
};

export const createGarageSupplier = async (
  data: SupplierCreate
): Promise<Supplier> => {
  const response = await api.post("/api/suppliers/", data);
  return response.data;
};

export const getGarageSupplierById = async (id: number): Promise<Supplier> => {
  const response = await api.get(`/api/suppliers/${id}/`);
  return response.data;
};

export const updateGarageSupplier = async (
  id: number,
  data: SupplierCreate
): Promise<Supplier> => {
  const response = await api.put(`/api/suppliers/${id}/`, data);
  return response.data;
};

export const deleteGarageSupplier = async (id: number): Promise<void> => {
  return await api.delete(`/api/suppliers/${id}/`);
};
