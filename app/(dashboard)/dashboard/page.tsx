import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Dashboard = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({ where: { userId } })

  if (store) redirect(`/dashboard/${store.id}`)
  return { children }
}

export default Dashboard