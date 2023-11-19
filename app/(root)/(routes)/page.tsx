'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { useStoreModal2 } from '@/hooks/use-store-modal2'
import { useEffect } from 'react'

// components which triggers the modal
export default function Home() {
  const { isOpen, onOpen, onClose } = useStoreModal()

  useEffect(() => {
    if (!isOpen) onOpen()
  }, [isOpen, onOpen])

  return null
}