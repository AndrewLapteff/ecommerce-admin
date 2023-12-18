import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { detectLang } from '@/lib/utils'
import Rating from '@/components/store/rating'
import { Globe } from 'lucide-react'
import dynamic from 'next/dynamic'
import AddToCardButton from '@/components/store/add-to-cart-button'
import { CartModal } from '@/components/models/cart-modal'
import { auth } from '@/lib/auth'
import OrderButton from '@/components/store/order-button'
import { SessionProvider } from 'next-auth/react'
import { Metadata } from 'next'

const Suggestions = dynamic(() => import('../../../../../components/store/suggestions'), {
  loading: () => (
    <p className="mt-16 text-xl font-semibold text-center animate-pulse">Loading...</p>
  ),
})

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

const ProductPage = async ({ params }: ProductParams) => {
  const product = await prismadb.product.findFirst({
    where: { id: params.productId },
    include: { category: true },
  })

  const session = await auth()

  // @ts-ignore
  delete product.price

  if (!product) return redirect('/')

  const lang = detectLang(product?.name[0])
  return (
    <>
      <CartModal userId={session?.user?.id!} items={[product]} />
      <section className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl h-full">
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-5">
          <div className="h-full flex flex-col col-span-3 order-2 lg:order-1 justify-evenly">
            <div>
              <nav className="w-full rounded-md">
                <ol className="list-reset flex">
                  <li>
                    <a
                      href="/"
                      className="text-blue-700 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                  </li>
                  <li>
                    <a
                      href={`/category/${product.category.name}`}
                      className="text-blue-700 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                    >
                      {product.category.name}
                    </a>
                  </li>
                  <li>
                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                  </li>
                  <li className="text-neutral-500 dark:text-neutral-400">{product.name}</li>
                </ol>
              </nav>
            </div>
            {/* <Link className="text-blue-600" href={`/${slugifyCategoryName(product.category.name)}`}>
            {product.category.name}
          </Link> */}
            <h2 className="font-semibold text-2xl">{product.name}</h2>
            <p>Description</p>
            <Rating string={product.name} />
            <div className="flex items-center space-x-1">
              <Globe width={20} height={20} />
              <p>{lang}</p>
            </div>
          </div>
          <div className="order-1 space-y-2">
            <div className={`aspect-[20/11] rounded-xl  lg:order-2 bg-gray-100 relative`}>
              <Image
                src={product.image}
                fill
                alt={product.name}
                sizes="(min-width: 1360px) 262px, (min-width: 1040px) 20vw, (min-width: 780px) calc(33.33vw - 58px), (min-width: 640px) calc(50vw - 66px), calc(100vw - 74px)"
                // priority
                loading="lazy"
                className="aspect-square object-cover rounded-md animate-fade-in"
              />
            </div>
            <AddToCardButton product={product} className="w-full h-12"></AddToCardButton>
            <SessionProvider session={session}>
              <OrderButton
                isAuthorized={typeof session?.user?.id === 'string' ? true : false}
                className="w-full h-12 bg-white text-black outline-2 outline outline-black hover:bg-gray-200"
              />
            </SessionProvider>
          </div>
        </div>

        <Suggestions product={product} />
      </section>
    </>
  )
}

export default ProductPage
