'use client'

import Button from '@/components/store/button'
import { useCart } from '@/hooks/use-cart'
import useMounted from '@/hooks/use-mounted'
import { ShoppingBag } from 'lucide-react'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from '../ui/use-toast'
export const magnetLink = 'magnet:?xt=urn:btih:90289fd34dfc1cf8f316a268add8354c85334458'

const NavbarActions = ({ session }: { session: Session | null }) => {
  const { isMounted } = useMounted()
  const cart = useCart()

  const isAuthenticated =
    typeof session?.user?.image === 'string' && session?.user !== undefined && session !== null

  if (!isMounted) return null

  const handleClick = async () => {
    // const torrentName = await saveTorrent(magnetLink)

    const response = await fetch('/api/file', {
      method: 'POST',
      body: JSON.stringify({ magnetUrl: magnetLink }),
    })

    const fileName = response.headers.get('File-Name')
    if (!fileName) {
      toast({
        title: 'Oops',
        description: 'Сontact this telegram account: ...',
        variant: 'destructive',
      })
      return
    }

    if (response.status !== 200) {
      console.error(response.status, response.statusText)
      return
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileName}.torrent`
    link.click()
    link.remove()
  }

  return (
    <div className="ml-auto flex items-center gap-x-2 lg:gap-x-3">
      {/* 
      // @ts-ignore */}
      {session?.user?.role === 'ADMIN' && (
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      )}
      <Button onClick={handleClick}>Download</Button>
      <Link href="/cart">
        <Button className="flex items-center rounded-full bg-black px-4 py-2">
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white w-2">{cart.items.length}</span>
        </Button>
      </Link>
      {isAuthenticated ? (
        <Link href="/profile">
          <Button className="flex items-center justify-center text-md px-2 gap-1 rounded-full">
            <span className="hidden md:block lg:block xl:block">{session?.user?.name}</span>
            <Image
              src={session?.user?.image!}
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
