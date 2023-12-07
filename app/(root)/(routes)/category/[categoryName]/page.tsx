import ProductList from '@/components/store/product-list'
import prismadb from '@/lib/prismadb'
import { unslugifyCategoryName } from '@/lib/utils'

const CategoryPage = async ({ params }: { params: { categoryName: string } }) => {
  const products = await prismadb.product.findMany({
    where: { category: { name: params.categoryName } },
  })

  return (
    <div className="mx-auto max-w-7xl">
      <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList products={products} title={unslugifyCategoryName(params.categoryName)} />
      </section>
    </div>
  )
}

export default CategoryPage
