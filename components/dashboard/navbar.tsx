import NavbarRoutes from '@/components/dashboard/navbar-routes'
import StoreSwitcher from './store-switcher'
import prismadb from '@/lib/prismadb'
import { ModeToggle } from './mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User } from 'next-auth'

const Navbar = async ({ user }: { user: User }) => {
  const stores = await prismadb.store.findMany({ where: { userId: user.id } })

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
