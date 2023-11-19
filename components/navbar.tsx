import { UserButton, auth } from '@clerk/nextjs'
import NavbarRoutes from '@/components/navbar-routes'
import StoreSwitcher from './store-switcher'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const Navbar = async () => {
  const { userId } = auth()
  if (userId === null) redirect('/')
  const stores = await prismadb.store.findMany({ where: { userId } })

  return (
    <nav className="border-b">
      <ul className="flex h-16 items-center px-4">
        <li>
          <StoreSwitcher items={stores} />
        </li>
        <li>Routes</li>
        <NavbarRoutes />
        <li className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
