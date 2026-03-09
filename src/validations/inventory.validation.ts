import { z } from 'zod';

export const createInventorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'El nombre es requerido').max(100),
    description: z.string().min(1, 'La descripción es requerida'),
    quantity: z.number().int().min(0, 'La cantidad debe ser un número positivo'),
    price: z.number().positive('El precio debe ser un número positivo'),
    category: z.string().min(1, 'La categoría es requerida')
  })
});

export const updateInventorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().min(1).optional(),
    quantity: z.number().int().min(0).optional(),
    price: z.number().positive().optional(),
    category: z.string().min(1).optional()
  }),
  params: z.object({
    id: z.string().min(1, 'El ID es requerido')
  })
});

export const getInventoryByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'El ID es requerido')
  })
});