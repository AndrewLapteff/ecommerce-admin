'use client'

import Button from '@/components/store/button'
import { useStoreModal } from '@/hooks/use-store-modal'
import { Product } from '@prisma/client'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product
}

const OrderButton = ({ product, className }: ButtonProps) => {
  const storeModal = useStoreModal()

  const clickHandler = () => {
    storeModal.onOpen()
  }

  return (
    <Button onClick={clickHandler} className={className}>
      Order
    </Button>
  )
}

export default OrderButton
