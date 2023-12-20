import Rating from '@/components/store/rating'
import { Globe } from 'lucide-react'
import Button from '@/components/store/button'

const ProductLoadingPage = async () => {
  return (
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
                    href={`/category/`}
                    className="text-blue-700 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >
                    Product
                  </a>
                </li>
                <li>
                  <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                </li>
                <li className="text-neutral-500 dark:text-neutral-400">Product</li>
              </ol>
            </nav>
          </div>
          <h2 className="font-semibold text-2xl">Loading</h2>
          <p>Description</p>
          <Rating string={'fs'} />
          <div className="flex items-center space-x-1">
            <Globe width={20} height={20} />
            <p>English</p>
          </div>
        </div>
        <div className="order-1 space-y-2">
          <div className={`aspect-[20/11] rounded-xl  lg:order-2 bg-gray-100 relative`}></div>
          <Button className="w-full h-12">Add to cart</Button>
          <Button className="w-full h-12 bg-white text-black outline-2 outline outline-black hover:bg-gray-200">
            Order
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProductLoadingPage
