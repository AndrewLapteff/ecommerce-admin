'use client'

import { useCart } from '@/hooks/use-cart'
import Button from './button'
import { Product } from '@prisma/client'
import useMounted from '@/hooks/use-mounted'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product
}

const AddToCardButton = ({ product, className }: ButtonProps) => {
  const cart = useCart()
  const { isMounted } = useMounted()
  const isItemInCart = cart.items.find((item) => item.id === product.id)

  const addItemHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    cart.addItem(product)
  }

  const removeItemHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    cart.removeItem(product.id)
  }

  if (!isMounted) return <Button className={className}>Loading...</Button>

  return (
    <Button onClick={isItemInCart ? removeItemHandler : addItemHandler} className={className}>
      {isItemInCart && <span className="animate-fade-in">Remove from cart</span>}
      {!isItemInCart && <span className="animate-fade-in">Add to cart</span>}
    </Button>
  )
}

export default AddToCardButton
