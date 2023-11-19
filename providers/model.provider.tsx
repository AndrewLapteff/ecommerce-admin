'use client'

import { StoreModal } from '@/components/models/StoreModal'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // prevents the hydration error
  if (!isMounted) {
    return null
  }

  return (
    <>
      <StoreModal />
    </>
  )
}
