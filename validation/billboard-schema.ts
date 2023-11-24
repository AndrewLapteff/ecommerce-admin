"use client"

import * as z from "zod"

export const billboardSchema = z.object({
  label: z.string().min(2).max(50),
})
