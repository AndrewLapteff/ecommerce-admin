'use client'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { CategoryColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

const CategoryClient = ({ category }: { category: CategoryColumn[] }) => {
  const router = useRouter()
  const params = useParams()

  const createBillboardHandler = () => {
    router.push(`/dashboard/${params.storeId}/categories/new`)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${category.length})`}
          description="Manage your store's categories"
        />
        <Button
          onClick={createBillboardHandler}
          aria-label="Add new category"
          size="default"
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={category} searchKey="name" />
    </>
  )
}

export default CategoryClient
