import { priceFormater } from '@/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className={`aspect-[20/11] rounded-xl bg-gray-100 relative`}>
        <Image
          src={product.image}
          fill={true}
          alt={product.name}
          sizes="(min-width: 1360px) 262px, (min-width: 1040px) 20vw, (min-width: 780px) calc(33.33vw - 58px), (min-width: 640px) calc(50vw - 66px), calc(100vw - 74px)"
          // priority={false}
          className="aspect-square object-cover rounded-md"
        />
      </div>
      <div>
        <p className="font-semibold text-lg">{product.name}</p>
      </div>
      <span className="font-bold">{priceFormater(product.price.toNumber())}</span>
    </Link>
  )
}

export default ProductCard
