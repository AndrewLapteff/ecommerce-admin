'use client'

import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

const OrderClient = ({ orders }: { orders: OrderColumn[] }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Orders (${orders.length})`} description="Manage your store's products" />
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={orders} searchKey="phone" />
    </>
  )
}

export default OrderClient
