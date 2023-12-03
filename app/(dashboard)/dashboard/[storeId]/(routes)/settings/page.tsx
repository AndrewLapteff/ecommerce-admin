import SettingsForm from './components/settings-form'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface SettingsPageParams {
  params: { storeId: string }
}

const SettingsPage = async ({ params }: SettingsPageParams) => {
  const { userId } = auth()
  if (userId === null) redirect('/sign-in')
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })
  if (store === null) redirect('/')
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm store={store} />
      </div>
    </div>
  )
}

export default SettingsPage
