import Navbar from '@/components/dashboard/navbar'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { WithAuthProps, withAuth } from '@/hooks/withAuth'

interface DashboardLayoutParams extends WithAuthProps {
  children: ReactNode
  params: { storeId: string }
}

export default withAuth(
  '/',
  async function DashboardLayout({ children, params, user }: DashboardLayoutParams) {
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: user.id,
      },
    })
    if (!store) redirect('/sign-in')

    return (
      <>
        <Navbar user={user} />
        {children}
      </>
    )
  }
)
