import prismadb from '@/lib/prismadb'
import OrderForm from './components/order-form'

const OrderNewPage = async ({ params }: { params: { orderId: string; storeId: string } }) => {
  const order = await prismadb.purchase.findFirst({
    where: { id: params.orderId },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm order={order} />
      </div>
    </div>
  )
}

export default OrderNewPage
