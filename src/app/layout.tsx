import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Caveat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

const siteUrl = 'https://tellyourstorylithophanes.com'

export const metadata: Metadata = {
  title: {
    default: 'Tell Your Story | Custom 3D Photo Lamps',
    template: '%s | Tell Your Story',
  },
  description:
    'Turn your favorite photos into stunning glowing 3D-printed photo lamps. Handcrafted lithophanes that bring your memories to life in light. Starting at $39.99.',
  keywords: [
    'lithophane',
    '3D photo lamp',
    'custom photo gift',
    'personalized lamp',
    '3D printed photo',
    'photo light box',
    'custom lithophane',
    'anniversary gift',
    'memorial gift',
    'pet portrait lamp',
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Tell Your Story',
    title: 'Tell Your Story | Custom 3D Photo Lamps',
    description:
      'Turn your favorite photos into stunning glowing 3D-printed photo lamps. Handcrafted and backlit, your memories transformed into light.',
    images: [
      {
        url: '/Lit up Blossoms.jpeg',
        width: 1200,
        height: 630,
        alt: 'A glowing 3D-printed lithophane photo lamp by Tell Your Story',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tell Your Story | Custom 3D Photo Lamps',
    description:
      'Turn your favorite photos into stunning glowing 3D-printed photo lamps.',
    images: ['/Lit up Blossoms.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const gaId = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} font-sans bg-cream-50 text-stone-900 min-h-screen flex flex-col antialiased`}>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
