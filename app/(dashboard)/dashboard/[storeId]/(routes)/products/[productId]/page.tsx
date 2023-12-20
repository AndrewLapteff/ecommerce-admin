import prismadb from '@/lib/prismadb'
import ProductForm from './components/product-form'

const ProductsNewPage = async ({ params }: { params: { storeId: string; productId: string } }) => {
  const product = await prismadb.product.findFirst({
    where: { id: params.productId },
  })

  // @ts-ignore

  const categories = await prismadb.category.findMany({ where: { storeId: params.storeId } })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm productData={product} categories={categories} />
      </div>
    </div>
  )
}

export default ProductsNewPage
