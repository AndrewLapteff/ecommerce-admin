'use client'

import { z } from 'zod'

export const orderSchema = z.object({
  customerId: z.string().nonempty(),
  productsIds: z.array(z.string()).default([]),
})
