import BillboardForm from '@/components/billboard-form'
import prismadb from '@/lib/prismadb'

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