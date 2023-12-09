import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import { priceFormater } from '@/lib/utils'
import { ProductColumn } from './components/columns'
import ProductClient from './components/product-client'

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  const formatedProducts: ProductColumn[] = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: priceFormater(Number.parseInt(product.price.toString())),
      isArchived: product.isArchived,
      isFeatured: product.isFeatured,
      category: product.category.name,
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
