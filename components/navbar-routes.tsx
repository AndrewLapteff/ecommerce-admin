'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { HTMLAttributes } from 'react'

const NavbarRoutes = ({ className }: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Dashboard',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname.includes('billboards'),
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <ul className={cn('flex items-center space-x-4 lg:space-x-6 mx-6', className)}>
      {routes.map((link) => {
        return (
          <li key={link.href}>
            <Link
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                link.active ? 'text-black dark:text-white' : 'text-muted-foreground'
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavbarRoutes
