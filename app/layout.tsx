import { Urbanist } from 'next/font/google'
import { ReactNode } from 'react'
import '@/app/globals.css'

export const metadata = {
  title: 'Free Courses',
  description: 'Free courses for everyone.',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  // const { userId } = auth()
  // if (!userId) redirect('/sign-in')
  // const store = await prismadb.store.findFirst({ where: { userId } })
  // if (store) redirect(`/dashboard/${store.id}`)

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
