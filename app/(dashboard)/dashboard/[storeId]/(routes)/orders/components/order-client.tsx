'use client'

import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

const OrderClient = ({ orders }: { orders: OrderColumn[] }) => {
  const router = useRouter()
  const params = useParams()

  const createOrderHandler = () => {
    router.push(`/dashboard/${params.storeId}/orders/new`)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Orders (${orders.length})`} description="Manage your store's products" />
        <Button
          onClick={createOrderHandler}
          aria-label="Add new product"
          size="default"
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={orders} searchKey="phone" />
    </>
  )
}

export default OrderClient
