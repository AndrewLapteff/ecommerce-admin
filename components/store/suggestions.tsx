import prismadb from '@/lib/prismadb'
import { Product } from '@prisma/client'
import ProductList from './product-list'
import { findProductsToSuggest } from '@/lib/utils'

const Suggestions = async ({ product }: { product: Product }) => {
  const products = await prismadb.product.findMany({ where: { NOT: { id: product.id } } })

  const suggestions = findProductsToSuggest(product.name, products)

  return (
    <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 transition-all animate-fade-in">
      <ProductList products={suggestions} />
    </section>
  )
}

export default Suggestions
