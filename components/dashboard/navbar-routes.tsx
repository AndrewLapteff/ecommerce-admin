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
      href: `/dashboard/${params.storeId}`,
      label: 'Dashboard',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/dashboard/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname.includes('billboards'),
    },
    {
      href: `/dashboard/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname.includes('categories'),
    },
    {
      href: `/dashboard/${params.storeId}/products`,
      label: 'Products',
      active: pathname.includes('products'),
    },
    {
      href: `/dashboard/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname.includes('orders'),
    },
    {
      href: `/dashboard/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <ul className={cn('flex items-center space-x-4 lg:space-x-6 mx-2', className)}>
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
