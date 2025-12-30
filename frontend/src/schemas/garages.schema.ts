import * as z from "zod";
import { DRFPaginatedSchema } from "./pagination";
import { nepaliPhoneRegex } from "./regex";

/**
 * garage service schemas
 */
export const serviceSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(255),
  description: z.string().optional().default(""),
  labor_rate: z
    .number()
    .refine((val) => val >= 0, { message: "Labor rate must be non-negative" }),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const serviceCreateSchema = serviceSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const serviceUpdateSchema = serviceCreateSchema.partial();
export const paginatedServiceSchema = DRFPaginatedSchema(serviceSchema);

export type Service = z.infer<typeof serviceSchema>;
export type ServiceCreate = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdate = z.infer<typeof serviceUpdateSchema>;
export type PaginatedServiceList = z.infer<typeof paginatedServiceSchema>;

/**
 * garage schemas
 */
export const GarageTypeEnum = z.enum([
  "auto-repair",
  "body-shop",
  "multi-service",
]);
export const WorkingHoursSchema = z.record(z.string(), z.string());

export const garageSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255),
  subdomain: z
    .string()
    .min(1)
    .max(255)
    .regex(
      /^[a-z0-9-]+$/,
      "Subdomain must be lowercase alphanumeric with hyphens"
    ),
  registration_number: z.string().min(1).max(100),
  tax_pan_number: z.string().min(1).max(50),
  garage_type: GarageTypeEnum,
  street_address: z.string().min(1).max(255),
  city: z.string().min(1).max(100),
  postal_code: z.string().min(1).max(20),
  phone_number: z
    .string()
    .min(5)
    .max(20)
    .regex(nepaliPhoneRegex, "Invalid phone number"),

  email_address: z.email(),
  working_hours: WorkingHoursSchema.nullable().optional(),
  is_active: z.boolean().default(true),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const garageCreateSchema = garageSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const garageUpdateSchema = garageCreateSchema.partial();
export const paginatedGarageSchema = DRFPaginatedSchema(garageSchema);

export type Garage = z.infer<typeof garageSchema>;
export type GarageCreate = z.infer<typeof garageCreateSchema>;
export type GarageUpdate = z.infer<typeof garageUpdateSchema>;
export type PaginatedGarageList = z.infer<typeof paginatedGarageSchema>;

/**
 * garage vehicle schemas
 */

export const FuelTypeValueEnum = z.enum(["Petrol", "Diesel", "Electric"]);
export const vehicleOwnerSchema = z.object({
  id: z.number().int().positive(),
  first_name: z.string(),
  last_name: z.string(),
});

export const baseVehicleSchema = z.object({
  id: z.number().int().positive(),
  registration_number: z.string().max(20).regex(nepaliPhoneRegex, {
    message:
      "Enter a valid Nepalese Vehicle Registration Number, e.g., Ba 1 Pa 1234.",
  }),
  make: z.string().min(1).max(50),
  model: z.string().min(1).max(50),
  year: z.number().int().positive().min(1886).max(9999).nullable().optional(),
  odometer_reading: z.number().int().nonnegative().default(0),
  fuel_type: FuelTypeValueEnum,
  owner_id: z.number().int(),
  owner: vehicleOwnerSchema,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const vehicleCreateSchema = baseVehicleSchema
  .omit({
    id: true,
    owner: true,
    created_at: true,
    updated_at: true,
  })
  .extend({
    image: z
      .any()
      .optional()
      .transform((files) =>
        files?.[0] instanceof File ? files[0] : undefined
      ),
  });

export const vehicleReadSchema = baseVehicleSchema
  .omit({
    owner_id: true,
  })
  .extend({
    image: z.url().optional().nullable(),
  });

export const paginatedVehicleSchema = DRFPaginatedSchema(vehicleReadSchema);

export type Vehicle = z.infer<typeof vehicleReadSchema>;
export type VehicleCreate = z.infer<typeof vehicleCreateSchema>;
export type PaginatedVehicleList = z.infer<typeof paginatedVehicleSchema>;
