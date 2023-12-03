import prismadb from '@/lib/prismadb'
import { priceFormater } from '@/lib/utils'
import { format } from 'date-fns'
import OrderClient from './components/order-client'
import { OrderColumn } from './components/columns'

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: { orderItem: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const fromatedOrders: OrderColumn[] = orders.map((order) => {
    return {
      id: order.id,
      isPaid: order.isPaid,
      phone: order.phone,
      address: order.address,
      products: order.orderItem
        .map((item) => {
          item.product.name
        })
        .join(', '),
      totalPrice: priceFormater(
        order.orderItem.reduce((acc, item) => acc + Number(item.product.price), 0)
      ),
      createdAt: format(order.createdAt, 'MMMM do, yyyy'),
    }
  })

  return (
    <section className="flex-col">
      <div className="flex-1 space-x-3 p-8 pt-6">
        <OrderClient orders={fromatedOrders} />
      </div>
    </section>
  )
}

export default OrdersPage
