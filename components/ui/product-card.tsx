import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import AddToCardButton from '../store/add-to-cart-button'

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-gray-100 group cursor-pointer rounded-xl border p-3 flex flex-col justify-between space-y-3"
    >
      <div className="space-y-4">
        <div className={`aspect-[20/11] rounded-xl bg-gray-100 relative`}>
          <Image
            src={product.image}
            fill={true}
            alt={product.name}
            sizes="(min-width: 1360px) 262px, (min-width: 1040px) 20vw, (min-width: 780px) calc(33.33vw - 58px), (min-width: 640px) calc(50vw - 66px), calc(100vw - 74px)"
            // priority={false}
            className="aspect-square object-cover rounded-xl animate-fade-in"
          />
        </div>
        <div>
          <p className="font-semibold text-lg leading-5">{product.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-xl tracking-widest">$1</span>
        <AddToCardButton product={product} />
      </div>
    </Link>
  )
}

export default ProductCard
