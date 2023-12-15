'use client'

import { CartModal } from '@/components/models/cart-modal'
import Button from '@/components/store/button'
import NoResults from '@/components/ui/no-results'
import ProductCard from '@/components/ui/product-card'
import { useCart } from '@/hooks/use-cart'
import useMounted from '@/hooks/use-mounted'
import { useStoreModal } from '@/hooks/use-store-modal'

const Card = ({ userId }: { userId: string }) => {
  const cart = useCart()
  const storeModal = useStoreModal()
  const { isMounted } = useMounted()

  if (!isMounted) {
    return null
  }
  console.log(cart.items)
  return (
    <>
      <CartModal userId={userId} items={cart.items} />
      <div className="mx-auto max-w-7xl main-height">
        {/* <ProductList products={cart.items} /> */}

        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 order-2 md:order-1 lg:order-1">
            {cart.items.length === 0 && <NoResults />}
            {cart.items.map((product) => (
              <li className="list-none" key={product.name}>
                <ProductCard key={product.name} product={product} />
              </li>
            ))}
          </ul>
          <div className="w-full flex flex-col items-center order-1 md:order-2: lg:order-2">
            <div className="w-11/12 lg:w-3/6 md:w-3/6 flex flex-col items-start">
              <h1 className="text-4xl font-semibold mt-10 ">CART</h1>
              <div className="flex justify-between w-full mb-3">
                <span className="font-semibold text-2xl">Total:</span>
                <span className="font-bold text-2xl">${cart.items.length}</span>
              </div>
              <Button
                onClick={cart.items.length === 0 ? () => {} : storeModal.onOpen}
                className="w-full text-2xl font-normal"
              >
                Order
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Card
