'use client'

import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const BillboardClient = () => {
  const router = useRouter()
  const params = useParams()

  const createBillboardHandler = () => {
    router.push(`/${params.storeId}/billboards/new`)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage your store's billboards"
        />
        <Button
          onClick={createBillboardHandler}
          aria-label="Add new billboard"
          size="default"
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  )
}

export default BillboardClient
