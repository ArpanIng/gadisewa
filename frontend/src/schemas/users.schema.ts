import * as z from "zod";

import { DRFPaginatedSchema } from "./pagination";
import { nepaliPhoneRegex } from "./regex";

/**
 * Garage customer schema
 */
const customerVehicleSchema = z.object({
  id: z.number().int(),
  registration_number: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number().nullable(),
  image: z.file().optional(),
});

export const baseCustomerSchema = z.object({
  id: z.number().int().positive(),
  first_name: z
    .string()
    .min(1, { error: "First name is required" })
    .max(100, { error: "First name must be at most 100 characters" }),
  last_name: z
    .string()
    .min(1, { error: "Last name is required" })
    .max(100, { error: "Last name must be at most 100 characters" }),
  phone_number: z
    .string()
    .max(10, { error: "Phone number must be at most 10 digits" })
    .regex(nepaliPhoneRegex, { error: "Invalid phone number" }),
  email: z.email({ error: "Invalid email address" }).optional().nullable(),
  address: z.string().optional().default(""),
  vehicle_count: z.number().int().positive(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const customerCreateSchema = baseCustomerSchema
  .omit({
    id: true,
    vehicle_count: true,
    created_at: true,
    updated_at: true,
  })
  .extend({
    avatar: z
      .any()
      .optional()
      .transform((files) =>
        files?.[0] instanceof File ? files[0] : undefined
      ),
  });

export const customerListSchema = baseCustomerSchema.extend({
  avatar: z.url().nullable().optional(),
});

export const customerDetailSchema = baseCustomerSchema.extend({
  vehicles: z.array(customerVehicleSchema),
});

export const customerUpdateSchema = customerCreateSchema.partial();

export const paginatedCustomerSchema = DRFPaginatedSchema(customerListSchema);

export type Customer = z.infer<typeof customerListSchema>;
export type CustomerCreate = z.infer<typeof customerCreateSchema>;
export type CustomerDetail = z.infer<typeof customerDetailSchema>;
export type CustomerUpdate = z.infer<typeof customerUpdateSchema>;
export type PaginatedCustomerList = z.infer<typeof paginatedCustomerSchema>;

export const userProfileSchema = z.object({
  id: z.number(),
  email: z.email(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  garage: z.string().nullable(),
  role: z.string().nullable(),
});

/**
 * Garage employee schema
 */
export const EmployeeRoleEnum = z.enum(["TECH", "ADVISOR", "ADMIN"]);

export const baseEmployeeSchema = z.object({
  id: z.number().int().positive(),
  username: z
    .string()
    .min(1, { error: "Username is required" })
    .max(100, { error: "First name must be at most 100 characters" }),
  first_name: z
    .string()
    .min(1, { error: "First name is required" })
    .max(100, { error: "First name must be at most 100 characters" }),
  last_name: z
    .string()
    .min(1, { error: "Last name is required" })
    .max(100, { error: "Last name must be at most 100 characters" }),
  email: z.email({ error: "Invalid email address" }),
  role: z.string(),
  is_active: z.boolean(),
  last_login: z.iso.datetime(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const employeeReadSchema = baseEmployeeSchema.extend({
  avatar: z.url().optional().nullable(),
});

export const employeeCreateSchema = baseEmployeeSchema
  .omit({
    id: true,
    is_active: true,
    last_login: true,
    created_at: true,
    updated_at: true,
  })
  .extend({
    avatar: z
      .any()
      .optional()
      .transform((files) =>
        files?.[0] instanceof File ? files[0] : undefined
      ),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(8, { error: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "Passwords do not match",
    path: ["confirm_password"],
  });

export const employeeUpdateSchema = employeeCreateSchema.partial();

export const paginatedEmployeeSchema = DRFPaginatedSchema(employeeReadSchema);

export type Employee = z.infer<typeof employeeReadSchema>;
export type EmployeeCreate = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdate = z.infer<typeof employeeUpdateSchema>;
export type PaginatedEmployeeList = z.infer<typeof paginatedEmployeeSchema>;
export type GarageEmployeesParams = {
  q?: string;
  sort?: string;
  limit?: number;
  page?: number;

  // generic filters based on Employee model fields
  department?: string;
  role?: "TECH" | "ADVISOR" | "ADMIN";
  is_active?: boolean;
};

export type UserProfile = z.infer<typeof userProfileSchema>;
