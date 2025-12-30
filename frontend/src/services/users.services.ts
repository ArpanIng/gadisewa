import api from "./api";
import {
  type Customer,
  type CustomerCreate,
  type CustomerDetail,
  type PaginatedCustomerList,
  type UserProfile,
  type Employee,
  type EmployeeCreate,
  type PaginatedEmployeeList,
  type GarageEmployeesParams,
} from "../schemas/users.schema";

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/api/profile/");
  return response.data;
};

/**
 * Garage customer API schemas
 */
export const getGarageCustomers = async (): Promise<PaginatedCustomerList> => {
  const response = await api.get("/api/customers/");
  return response.data;
};

export const createGarageCustomer = async (
  data: CustomerCreate
): Promise<Customer> => {
  const response = await api.post("/api/customers/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getGarageCustomerById = async (
  id: number
): Promise<CustomerDetail> => {
  const response = await api.get(`/api/customers/${id}/`);
  return response.data;
};

export const updateGarageCustomer = async (
  id: number,
  data: CustomerCreate
): Promise<Customer> => {
  const response = await api.put(`/api/customers/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteGarageCustomer = async (id: number): Promise<void> => {
  return await api.delete(`/api/customers/${id}/`);
};

/**
 * Garage employee API schemas
 */
export const getGarageEmployees = async (
  params?: GarageEmployeesParams
): Promise<PaginatedEmployeeList> => {
  const response = await api.get("/api/employees/", {
    params: params,
  });
  return response.data;
};

export const createGarageEmployee = async (
  data: EmployeeCreate
): Promise<Employee> => {
  const response = await api.post("/api/employees/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteGarageEmployeeById = async (id: number): Promise<void> => {
  return await api.delete(`/api/employees/${id}/`);
};
