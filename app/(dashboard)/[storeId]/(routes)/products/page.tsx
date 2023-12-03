import { ProductColumn } from '@/app/(dashboard)/[storeId]/(routes)/products/components/columns'
import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import ProductClient from '@/app/(dashboard)/[storeId]/(routes)/products/components/product-client'

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  })

  const formatedProducts: ProductColumn[] = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      createdAt: format(product.createdAt, 'MMMM do, yyyy'),
    }
  })

  return (
    <section className="flex-col">
      <div className="flex-1 space-x-3 p-8 pt-6">
        <ProductClient products={formatedProducts} />
      </div>
    </section>
  )
}

export default ProductsPage
