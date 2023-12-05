import Container from '@/components/ui/container'
import Link from 'next/link'
import MainNav from '@/components/store/main-nav'
import prismadb from '@/lib/prismadb'
import NavbarActions from '@/components/store/navbar-actions'

const StoreNavbar = async () => {
  const categories = await prismadb.category.findMany()

  return (
    <nav className="border-b">
      <Container>
        <ul className="relative px-4 sm:px-6 lg:px-6 flex h-16 items-center">
          <Link className="ml-4 flex lg:ml-0 gap-x-2" href="/">
            <p className="font-bold text-xl">Store</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </ul>
      </Container>
    </nav>
  )
}

export default StoreNavbar
