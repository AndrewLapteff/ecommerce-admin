'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'
import { Decimal } from '@prisma/client/runtime/library'

export type ProductColumn = {
  id: string
  name: string
  price: Decimal
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
