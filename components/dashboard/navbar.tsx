import { UserButton, auth } from '@clerk/nextjs'
import NavbarRoutes from '@/components/dashboard/navbar-routes'
import StoreSwitcher from './store-switcher'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ModeToggle } from './mode-toggle'
const UserButtonLazy = dynamic(() => import('./user-button'))

const Navbar = async () => {
  const { userId } = auth()
  if (userId === null) redirect('/')
  const stores = await prismadb.store.findMany({ where: { userId } })

  return (
    <nav className="border-b">
      <ul className="flex h-16 items-center px-4 gap-4">
        <li>
          <StoreSwitcher items={stores} />
        </li>
        <NavbarRoutes />
        <li className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </li>
        <li>
          <Suspense>
            <UserButtonLazy />
          </Suspense>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar