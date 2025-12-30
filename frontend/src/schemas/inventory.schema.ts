import * as z from "zod";
import { DRFPaginatedSchema } from "./pagination";
import { nepaliPhoneRegex } from "./regex";

/**
 * inventory category schemas
 */
export const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(255),
  is_active: z.boolean().default(true),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const categoryCreateSchema = categorySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const categoryUpdateSchema = categoryCreateSchema.partial();
export const paginatedCategorySchema = DRFPaginatedSchema(categorySchema);

export type Category = z.infer<typeof categorySchema>;
export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>;
export type PaginatedCategoryList = z.infer<typeof paginatedCategorySchema>;

/**
 * inventory supplier schemas
 */
export const supplierSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(255),
  email: z.email().max(255).optional().nullable(),
  phone_number: z
    .string()
    .regex(nepaliPhoneRegex, { error: "Invalid phone number" }),
  is_active: z.boolean().default(true),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const supplierCreateSchema = supplierSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const supplierUpdateSchema = supplierCreateSchema.partial();
export const paginateSupplierSchema = DRFPaginatedSchema(supplierSchema);

export type Supplier = z.infer<typeof supplierSchema>;
export type SupplierCreate = z.infer<typeof supplierCreateSchema>;
export type SupplierUpdate = z.infer<typeof supplierUpdateSchema>;
export type PaginatedSupplierList = z.infer<typeof paginateSupplierSchema>;

/**
 * inventory part schemas
 */
export const basePartSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(200),
  sku: z.string().max(50),
  brand: z.string().max(100).optional().default(""),
  image: z.string().url().optional().nullable(),
  purchase_price: z
    .number()
    .nonnegative()
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Must have at most 2 decimal places",
    }),
  selling_price: z
    .number()
    .nonnegative()
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Must have at most 2 decimal places",
    }),
  quantity: z.number().int().nonnegative().default(0),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const partReadchema = basePartSchema.extend({
  category: categorySchema,
  supplier: supplierSchema,
  in_stock: z.boolean(),
  in_low_stock: z.boolean(),
  is_out_of_stock: z.boolean(),
});

export const partCreateSchema = basePartSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
  })
  .extend({
    category_id: z.number().int(),
    supplier_id: z.number().int(),
  });

export const partUpdateSchema = partCreateSchema.partial();
export const patinatedPartSchema = DRFPaginatedSchema(partReadchema);

export type Part = z.infer<typeof partReadchema>;
export type PartCreate = z.infer<typeof partCreateSchema>;
export type PartUpdate = z.infer<typeof partUpdateSchema>;
export type PaginatedPartList = z.infer<typeof patinatedPartSchema>;
