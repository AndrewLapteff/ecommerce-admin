import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/model.provider'
import { Toaster } from '@/components/ui/toaster'

import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider />
        <ClerkProvider>{children}</ClerkProvider>
        <Toaster />
      </body>
    </html>
  )
}
