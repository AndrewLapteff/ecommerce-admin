import Navbar from '@/components/dashboard/navbar'
import prismadb from '@/lib/prismadb'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface DashboardLayoutParams {
  children: ReactNode
  params: { storeId: string }
}

export default async function DashboardLayout({ children, params }: DashboardLayoutParams) {
  const session = await auth()
  if (typeof session?.user === 'undefined') redirect('/')

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: session.user.id,
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
