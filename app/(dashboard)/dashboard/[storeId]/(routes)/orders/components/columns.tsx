'use client'

import { ColumnDef } from '@tanstack/react-table'

export type OrderColumn = {
  id: string
  isPaid: boolean
  phone: string
  address: string
  products: string
  totalPrice: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
]
