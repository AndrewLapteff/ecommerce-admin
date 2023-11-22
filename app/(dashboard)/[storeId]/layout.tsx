import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

interface DashboardLayoutParams {
  children: ReactNode
  params: { storeId: string }
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutParams) {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) redirect('/sign-in')

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
