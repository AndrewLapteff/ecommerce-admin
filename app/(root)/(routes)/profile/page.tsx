import ProfileClient from './components/profile.client'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { withAuth } from '@/hooks/withAuth'

const ProfilePage = withAuth('/api/auth/signin', async ({ user }) => {
  const userInfo = await prismadb.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (userInfo === null) return redirect('/api/auth/signin')

  return (
    <>
      <ProfileClient user={userInfo}>
        <span></span>
      </ProfileClient>
    </>
  )
})
export default ProfilePage
