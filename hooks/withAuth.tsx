import { auth } from '@/lib/auth'
import { User } from 'next-auth'
import { redirect } from 'next/navigation'
import { ComponentType, FC } from 'react'

export interface WithAuthProps {
  user: User
}

export const withAuth =
  <P extends WithAuthProps>(redirectPath: string, Component: ComponentType<P>): FC<P> =>
  async (props: any) => {
    const session = await auth()

    if (typeof session?.user === 'undefined') redirect(redirectPath)

    return <Component {...props} user={session.user} />
  }
