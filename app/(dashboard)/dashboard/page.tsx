import prismadb from '@/lib/prismadb'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Dashboard = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (session === null) return redirect('/')
  if (typeof session?.user === 'undefined') redirect('/')
  // @ts-ignore
  if (session?.user.role! === 'USER') redirect('/')

  const store = await prismadb.store.findFirst({ where: { userId: session.user.id } })
  if (store) {
    redirect(`/dashboard/${store.id}`)
  } else {
    redirect('/dashboard/create')
  }
  return { children }
}

export default Dashboard
