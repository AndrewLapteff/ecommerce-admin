"use client"

import * as z from "zod"

export const productSchema = z.object({
  name: z.string().min(2).max(20),
  price: z.coerce.number().min(0.01).max(100000),
  categoryId: z.string().uuid(),
  url: z.string().url().optional(),
})
