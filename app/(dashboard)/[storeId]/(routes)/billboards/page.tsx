import BillboardClient from '@/components/billboard-client'
import { BillboardColumn } from '@/components/columns'
import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  })

  const formatedBillboards: BillboardColumn[] = billboards.map((billboard) => {
    return {
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, 'MMMM do, yyyy'),
    }
  })

  return (
    <section className="flex-col">
      <div className="flex-1 space-x-3 p-8 pt-6">
        <BillboardClient billboards={formatedBillboards} />
      </div>
    </section>
  )
}

export default BillboardsPage
