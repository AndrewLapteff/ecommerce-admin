import BillboardForm from '@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/components/billboard-form'
import APIAlert from '@/components/ui/api-alert'
import prismadb from '@/lib/prismadb'
import { usePathname, useRouter } from 'next/navigation'

const BillboardNewPage = async ({ params }: { params: { billboardId: string } }) => {
  const billboard = await prismadb.billboard.findFirst({
    where: { id: params.billboardId },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm billboardData={billboard} />
      </div>
    </div>
  )
}

export default BillboardNewPage
