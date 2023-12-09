import { Product } from '@prisma/client'
import NoResults from '../ui/no-results'
import ProductCard from '@/components/ui/product-card'

const ProductList = ({ products, title }: { products: Product[]; title?: string }) => {
  return (
    <>
      <h3 className="font-bold text-2xl">{title}</h3>
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          return <ProductCard key={product.name} product={product} />
        })}
      </div>
    </>
  )
}

export default ProductList