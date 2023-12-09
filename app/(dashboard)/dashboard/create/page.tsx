'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect } from 'react'

const CreateStore = () => {
  const { isOpen, onOpen, onClose } = useStoreModal()

  useEffect(() => {
    if (!isOpen) onOpen()
  }, [isOpen, onOpen])

  return <div></div>
}

export default CreateStore
