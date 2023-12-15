'use client'

import { StoreModal } from '@/components/models/store-modal'
import useMounted from '@/hooks/use-mounted'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
  const isMounted = useMounted

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
