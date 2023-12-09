import BillboardPage from '@/components/store/billboard'
import ProductList from '@/components/store/product-list'
import prismadb from '@/lib/prismadb'

export default async function Home() {
  const products = await prismadb.product.findMany()
  const billboard = await prismadb.billboard.findFirst({ where: { isActive: true } }) // TODO: selecting functionality

  products.forEach((product) => {
    // @ts-ignore
    delete product.price
  })

  return (
    <main className="mx-auto max-w-7xl">
      <section className="space-y-10 pb-10">
        <BillboardPage billboard={billboard!} />
      </section>
      <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList products={products} title="POPULAR PRODUCTS" />
      </section>
    </main>
  )
}
