'use client'

import Button from '@/components/store/button'
import { useCart } from '@/hooks/use-cart'
import { ShoppingBag } from 'lucide-react'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const NavbarActions = ({ session }: { session: Session }) => {
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isAuthenticated =
    typeof session?.user?.image === 'string' && session?.user !== undefined && session !== null

  if (!isMounted) return null
  if (typeof session?.user === 'undefined') return null
  if (!session.user.image) return null

  return (
    <div className="ml-auto flex items-center gap-x-2 lg:gap-x-3">
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
      <Link href="/cart">
        <Button className="flex items-center rounded-full bg-black px-4 py-2">
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>
        </Button>
      </Link>
      {isAuthenticated ? (
        <Link href="/profile">
          <Button className="flex items-center justify-center text-md px-2 gap-1 rounded-full">
            <span className="hidden md:block lg:block xl:block">{session?.user?.name}</span>
            <Image
              src={session?.user?.image}
              className="rounded-full"
              width={25}
              height={25}
              alt="Avatar"
            />
          </Button>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  )
}

export default NavbarActions
