import BillboardPage from '@/components/store/billboard'
import ProductList from '@/components/store/product-list'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="mx-auto max-w-7xl main-height">
      <section className="space-y-10 pb-10">
        <BillboardPage label="One Course - One Dollar" />
      </section>
      <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-2xl">POPULAR PRODUCTS</h2>
        <Suspense fallback={null}>
          <ProductList />
        </Suspense>
      </section>
    </main>
  )
}
