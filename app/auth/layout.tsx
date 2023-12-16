import { Urbanist } from 'next/font/google'
import { ReactNode } from 'react'
import '@/app/globals.css'
import { SessionProvider } from 'next-auth/react'

export const metadata = {
  title: 'Free Courses',
  description: 'Free courses for everyone.',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
