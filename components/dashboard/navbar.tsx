import { auth } from '@/lib/auth'
import NavbarRoutes from '@/components/dashboard/navbar-routes'
import StoreSwitcher from './store-switcher'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ModeToggle } from './mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = async () => {
  const session = await auth()
  if (typeof session?.user === 'undefined') redirect('/')
  const stores = await prismadb.store.findMany({ where: { userId: session.user.id } })

  return (
    <nav className="border-b">
      <ul className="flex h-16 items-center px-4 gap-4">
        <li>
          <StoreSwitcher items={stores} />
        </li>
        <NavbarRoutes />
        <li className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <Link href="/">
            <Button>Back to store</Button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
