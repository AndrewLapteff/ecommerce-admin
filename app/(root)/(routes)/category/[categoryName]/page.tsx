import ProductList from '@/components/store/product-list'
import { unslugifyCategoryName } from '@/lib/utils'
import { Suspense } from 'react'

export async function generateMetadata({ params }: { params: { categoryName: string } }) {
  const categoryName = unslugifyCategoryName(params.categoryName)

  return {
    title: categoryName,
    description: categoryName,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: categoryName,
      description: categoryName,
      type: 'website',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: categoryName,
        },
      ],
    },
    twitter: {
      title: categoryName,
      description: categoryName,
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: categoryName,
        },
      ],
      site: '@site',
    },
  }
}

const CategoryPage = async ({ params }: { params: { categoryName: string } }) => {
  return (
    <div className="mx-auto max-w-7xl main-height">
      <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-2xl">{unslugifyCategoryName(params.categoryName)}</h2>
        <Suspense fallback={null}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  )
}

export default CategoryPage
