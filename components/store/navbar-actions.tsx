'use client'

import { downloadTorrent } from '@/actions/torrent.action'
import Button from '@/components/store/button'
import { useCart } from '@/hooks/use-cart'
import useMounted from '@/hooks/use-mounted'
import { ShoppingBag } from 'lucide-react'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
export const magnetLink =
  'magnet:?xt=urn:btih:1570331B5B9FEBFB34E1A487C09D66B3D10281DF&dn=How+to+Win+Friends+and+Influence+People+in+the+Digital+Age+By+Dale+Carnegie&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce'

const NavbarActions = ({ session }: { session: Session | null }) => {
  const { isMounted } = useMounted()
  const cart = useCart()

  const isAuthenticated =
    typeof session?.user?.image === 'string' && session?.user !== undefined && session !== null

  if (!isMounted) return null

  // const handleClick = async () => {
  //   const response = await fetch('/api/file', { method: 'GET' })

  //   if (response.status !== 200) {
  //     console.error(response.status, response.statusText)
  //     return
  //   }

  //   const blob = await response.blob()
  //   const url = window.URL.createObjectURL(blob)
  //   const link = document.createElement('a')
  //   link.href = url
  //   link.download = 'test.torrent'
  //   link.click()
  // }

  return (
    <div className="ml-auto flex items-center gap-x-2 lg:gap-x-3">
      {session?.user?.role === 'ADMIN' && (
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      )}
      {/* <Button onClick={handleClick}>Download</Button> */}
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
