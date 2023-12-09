'use client'

import { useCart } from '@/hooks/use-cart'
import Button from './button'
import { Product } from '@prisma/client'
import { useEffect, useState } from 'react'

const AddToCardButton = ({ product }: { product: Product }) => {
  const cart = useCart()
  const [isMounted, setIsMounted] = useState(false)
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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Button className="py-1 px-3 rounded-lg">Loading...</Button>

  return (
    <Button
      onClick={isItemInCart ? removeItemHandler : addItemHandler}
      className="py-1 px-3 rounded-lg"
    >
      {isItemInCart ? 'Remove from cart' : 'Add to cart'}
    </Button>
  )
}

export default AddToCardButton
