import { Product } from '@prisma/client'
import NoResults from '../ui/no-results'
import ProductCard from '@/components/ui/product-card'
import prismadb from '@/lib/prismadb'

type ProductListProps = {
  products: Product[]
  title?: string
}

const ProductList = async () => {
  const products = await prismadb.product.findMany()

  return (
    <>
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </>
  )
}

export default ProductList
