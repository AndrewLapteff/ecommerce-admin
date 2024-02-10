import { ReactNode } from 'react'
import '@/app/globals.css'
import Script from 'next/script'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://onedollarcourses.vercel.app'),
  title: 'One Dollar Courses',
  description: 'Free courses for everyone.',
  verification: {
    google: 'google-site-verification=NjjaSWa-Ti2jyahV-2OYfTe9xIFJPYFzNOLOzD19MLc',
  },
  category: 'education',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'One Dollar Courses',
    images: [
      {
        url: 'og.png',
        width: 1200,
        height: 630,
        alt: 'One Dollar Courses',
      },
    ],
  },
}

const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arPguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
    `}
      </Script> */}
    </html>
  )
}
