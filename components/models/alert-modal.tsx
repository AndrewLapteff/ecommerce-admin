'use client'

import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

interface AlertModalParams {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

const AlertModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: AlertModalParams) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full flex justify-between space-y-2 items-center">
        <Button onClick={onConfirm} disabled={loading} variant="destructive">
          Confirm
        </Button>
        <Button onClick={onClose} disabled={loading} variant="outline">
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
