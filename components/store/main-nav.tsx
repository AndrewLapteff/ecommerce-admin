'use client'

import { slugifyCategoryName, cn, unslugifyCategoryName } from '@/lib/utils'
import { Category } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MainNavProps {
  data: Category[]
}

const MainNav = ({ data }: MainNavProps) => {
  const pathname = usePathname()
  const routes = data.map((route) => {
    return {
      href: `/category/${slugifyCategoryName(route.name)}`,
      label: route.name,
      active: pathname === `/category/${slugifyCategoryName(route.name)}`,
    }
  })
  return (
    <ul className="mx-6 items-center space-x-4 hidden md:flex lg:flex xl:flex lg:space-x-6">
      {routes.map((route) => {
        return (
          <li key={route.label}>
            <Link
              className={cn(
                'text-sm font-medium transition-colors hover:text-black',
                route.active ? 'text-black' : 'text-neutral-500'
              )}
              href={route.href}
            >
              {route.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default MainNav
