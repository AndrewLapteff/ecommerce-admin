'use client'

import ProductList from '@/components/store/product-list'
import Container from '@/components/ui/container'
import { useCart } from '@/hooks/use-cart'

const Card = () => {
  const cart = useCart()
  return (
    <Container>
      <ProductList products={cart.items} />
    </Container>
  )
}

export default Card
