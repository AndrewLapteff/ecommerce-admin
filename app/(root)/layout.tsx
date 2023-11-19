import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({ where: { userId } })

  if (store) redirect(`/${store.id}`)

  return <>{children}</>
}
