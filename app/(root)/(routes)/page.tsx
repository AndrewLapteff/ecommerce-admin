import BillboardPage from '@/components/store/billboard'
import ProductList from '@/components/store/product-list'
import prismadb from '@/lib/prismadb'

export default async function Home() {
  // const { isOpen, onOpen, onClose } = useStoreModal()

  // useEffect(() => {
  //   if (!isOpen) onOpen()
  // }, [isOpen, onOpen])

  const products = await prismadb.product.findMany()
  const billboard = await prismadb.billboard.findFirst({ skip: 2 })

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
