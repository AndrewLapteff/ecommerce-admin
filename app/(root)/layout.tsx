import Footer from '@/components/store/footer'
import StoreNavbar from '@/components/store/navbar'
import { Toaster } from '@/components/ui/toaster'
import { Urbanist } from 'next/font/google'
import { ReactNode } from 'react'

const font = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: 'Free Courses',
  description: 'Free courses for everyone.',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreNavbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
