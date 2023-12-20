import { Suspense } from 'react'
import ProductPage from './components/product-info'
import prismadb from '@/lib/prismadb'
import { Metadata } from 'next'
import ProductLoadingPage from './components/product-loading-page'

interface ProductParams {
  params: {
    productId: string
  }
}

export async function generateMetadata({ params }: ProductParams): Promise<Metadata> {
  const product = await prismadb.product.findFirst({
    where: { id: params.productId },
  })
  if (!product)
    return {
      title: 'Not found',
      description: 'Product is not found',
    }

  return {
    title: product.name,
    description: product.name,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: product.name,
      description: product.name,
      type: 'website',
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      title: product.name,
      description: product.name,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      site: '@site',
    },
  }
}

const Product = ({ params }: ProductParams) => {
  return (
    <Suspense fallback={<ProductLoadingPage />}>
      <ProductPage params={params} />
    </Suspense>
  )
}

export default Product
