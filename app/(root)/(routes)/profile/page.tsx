import { auth } from '@/lib/auth'
import ProfileClient from './components/profile.client'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const ProfilePage = async () => {
  const session = await auth()

  if (session === null) return redirect('/api/auth/signin')
  if (session.user === undefined) return redirect('/api/auth/signin')

  const user = await prismadb.user.findFirst({
    where: {
      id: session.user.id,
    },
  })

  if (user === null) return redirect('/api/auth/signin')

  return (
    <>
      <ProfileClient user={user}>
        <span></span>
      </ProfileClient>
    </>
  )
}
export default ProfilePage
