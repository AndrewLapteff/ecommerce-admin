import Link from 'next/link'
import MainNav from '@/components/store/main-nav'
import prismadb from '@/lib/prismadb'
import NavbarActions from '@/components/store/navbar-actions'
import { auth } from '@/lib/auth'

const StoreNavbar = async () => {
  const categories = await prismadb.category.findMany()
  const session = await auth()

  if (!session) return null

  return (
    <nav className="border-b mx-auto max-w-7xl">
      <ul className="relative px-4 sm:px-6 lg:px-6 flex h-16 items-center">
        <Link className="ml-4 flex lg:ml-0 gap-x-2" href="/">
          <span className="font-bold text-xl">Store</span>
        </Link>
        <MainNav data={categories} />
        <NavbarActions session={session} />
      </ul>
    </nav>
  )
}

export default StoreNavbar
