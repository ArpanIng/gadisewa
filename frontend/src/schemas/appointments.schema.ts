import * as z from "zod";
import { serviceSchema } from "./garages.schema";
import { DRFPaginatedSchema } from "./pagination";

const appointmentCustomerSchema = z.object({
  id: z.number().int(),
  first_name: z.string(),
  last_name: z.string(),
});

const appointmentVehicleSchema = z.object({
  id: z.number().int(),
  registration_number: z.string(),
  make: z.string(),
});

const appointmentMechanicSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.string(),
});

const appointmentValueStatusEnum = z.enum([
  "scheduled",
  "in_progress",
  "confirmed",
  "completed",
  "cancelled",
]);
const appointmentLabelStatusEnum = z.enum([
  "Scheduled",
  "In Progress",
  "Confirmed",
  "Completed",
  "Cancelled",
]);

export const baseAppointmentSchema = z.object({
  id: z.number().int(),
  customer: appointmentCustomerSchema,
  customer_id: z.number().int(),
  vehicle: appointmentVehicleSchema,
  vehicle_id: z.number().int(),
  mechanic: appointmentMechanicSchema.nullable(),
  mechanic_id: z.number().int().nullable().optional(),
  service: serviceSchema,
  service_id: z.number().int(),
  appointment_date: z.iso.datetime({ offset: false }),
  notes: z.string().optional(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const appointmentCreateSchema = baseAppointmentSchema
  .omit({
    id: true,
    customer: true,
    vehicle: true,
    mechanic: true,
    service: true,
    created_at: true,
    updated_at: true,
  })
  .extend({
    status: appointmentValueStatusEnum,
  });

export const appointmentReadSchema = baseAppointmentSchema
  .omit({
    customer_id: true,
    vehicle_id: true,
    service_id: true,
    mechanic_id: true,
  })
  .extend({
    status: appointmentLabelStatusEnum,
  });

export const appointmentUpdateSchema = appointmentCreateSchema.partial();
export const paginatedAppointmentSchema = DRFPaginatedSchema(
  appointmentReadSchema
);

export type Appointment = z.infer<typeof appointmentReadSchema>;
export type AppointmentCreate = z.infer<typeof appointmentCreateSchema>;
export type AppointmentUpdate = z.infer<typeof appointmentUpdateSchema>;
export type PaginatedAppointmentList = z.infer<
  typeof paginatedAppointmentSchema
>;
