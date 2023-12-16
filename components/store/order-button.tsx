'use client'

import Button from '@/components/store/button'
import { useEventStore } from '@/hooks/use-reload'
import { useStoreModal } from '@/hooks/use-store-modal'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isAuthorized: boolean
}

const OrderButton = ({ className, isAuthorized }: ButtonProps) => {
  const storeModal = useStoreModal()
  const router = useRouter()

  const clickHandler = () => {
    storeModal.onOpen()
  }

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX
    const dualScreenTop = window.screenTop ?? window.screenY

    const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width

    const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height

    const systemZoom = width / window.screen.availWidth

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft
    const top = (height - 550) / 2 / systemZoom + dualScreenTop

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
    )

    newWindow?.focus()
  }

  const unAuthClickHandler = () => signIn('google')

  return (
    <Button onClick={isAuthorized ? clickHandler : unAuthClickHandler} className={className}>
      Order
    </Button>
  )
}

export default OrderButton
