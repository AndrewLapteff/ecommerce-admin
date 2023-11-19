'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { useStoreModal2 } from '@/hooks/use-store-modal2'
import { useEffect } from 'react'

export default function Home() {
  const { isOpen, onOpen, onClose } = useStoreModal()

  useEffect(() => {
    if (!isOpen) onOpen()
  }, [isOpen, onOpen])

  return <div>hello</div>
}
