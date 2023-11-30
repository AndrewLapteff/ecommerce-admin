"use client"

import * as z from "zod"

export const categorySchema = z.object({
  name: z.string().min(2).max(20),
  billboardLabel: z.string().optional(),
})
