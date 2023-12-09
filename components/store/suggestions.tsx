import prismadb from '@/lib/prismadb'
import { Product } from '@prisma/client'
import ProductList from './product-list'
import { findProductsToSuggest } from '@/lib/utils'

const Suggestions = async ({ product }: { product: Product }) => {
  const products = await prismadb.product.findMany({ where: { NOT: { id: product.id } } })
  products.forEach((product) => {
    // @ts-ignore
    delete product.price
  })
  const suggestions = findProductsToSuggest(product.name, products)

  // how to add this animation?
  return (
    <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 transition-all animate-fade-in">
      <ProductList products={suggestions} />
    </section>
  )
}

export default Suggestions
