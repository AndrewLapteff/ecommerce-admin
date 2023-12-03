'use client'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { ProductColumn, columns } from './columns'
import { DataTable } from '../../../../../../components/ui/data-table'

const ProductClient = ({ products }: { products: ProductColumn[] }) => {
  const router = useRouter()
  const params = useParams()

  const createBillboardHandler = () => {
    router.push(`/${params.storeId}/products/new`)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage your store's products"
        />
        <Button
          onClick={createBillboardHandler}
          aria-label="Add new product"
          size="default"
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={products} searchKey="label" />
    </>
  )
}

export default ProductClient
