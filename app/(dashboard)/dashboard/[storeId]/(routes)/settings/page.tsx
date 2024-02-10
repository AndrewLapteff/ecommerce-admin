import SettingsForm from './components/settings-form'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { WithAuthProps, withAuth } from '@/hooks/withAuth'

interface SettingsPageParams extends WithAuthProps {
  params: { storeId: string }
}

const SettingsPage = withAuth('/sign-in', async ({ params, user }: SettingsPageParams) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: user.id,
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
})

export default SettingsPage
