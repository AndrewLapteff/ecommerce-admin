'use client'

import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Progress } from '../ui/progress'

interface AlertModalParams {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

const AlertModal = ({ isOpen, loading, onClose, onConfirm }: AlertModalParams) => {
  const [isMounted, setIsMounted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const progressHandler = () => {
    setProgress(33)
    setTimeout(() => {
      setProgress(80)
    }, 600)
    setTimeout(() => {
      setProgress(90)
    }, 700)
    setTimeout(() => {
      setProgress(100)
    }, 800)
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Progress value={progress} />
      <div className="w-full flex justify-between space-y-2 items-center">
        <Button
          onClick={() => {
            onConfirm()
            progressHandler()
          }}
          disabled={loading}
          variant="destructive"
        >
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
