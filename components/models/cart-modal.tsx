'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/store/button'
import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@prisma/client'
import Image from 'next/image'
import telegramIcon from '@/public/icons-telegram.svg'

export const CartModal = ({ userId, items }: { userId: string; items: Product[] }) => {
  const storeModal = useStoreModal()
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    const itemsIds = items.map((item) => item.id).join(', ')
    const textToCopy = `userId: ${userId}, itemsIDs: [${itemsIds}]`
    navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Modal title="Checkout" description="" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
      <div className="space-y-2">
        <p className="font-bold">You have to copy following information and send it here:</p>
        <Link target="_blank" href="https://t.me/andrewlapteff">
          <Button className="flex justify-center items-center gap-1 px-2 ">
            <Image src={telegramIcon} width={20} height={20} alt="telegramIcon" />
            Telegram
          </Button>
        </Link>
      </div>
      <div>
        <p className="font-semibold">Your user ID:</p>
        <pre className="text-white px-1 bg-black w-fit rounded-md">{userId}</pre>
      </div>
      <div>
        <p className="font-semibold">Product IDs:</p>
        <pre>
          <ul className="bg-black w-fit px-1 rounded-md">
            {items.map((item) => {
              return (
                <li className="w-fit text-white" key={item.id}>
                  {item.id}
                </li>
              )
            })}
          </ul>
        </pre>
      </div>
      <Button onClick={copyToClipboard}>{isCopied ? 'Copied!' : 'Copy all IDs'}</Button>
    </Modal>
  )
}
