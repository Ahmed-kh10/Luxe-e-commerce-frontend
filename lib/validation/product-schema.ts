import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  brandId: z.coerce.number().int().positive('Please select a brand'),
  typeId: z.coerce.number().int().positive('Please select a category'),
});

export type ProductFormValues = z.infer<typeof productSchema>;
