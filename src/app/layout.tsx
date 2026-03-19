import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// next/font automatically downloads and self-hosts fonts — no external request at runtime
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tell Your Story — Custom 3D Photo Lamps',
  description:
    'Turn your favorite photos into stunning glowing 3D photo lamps. Handcrafted and backlit — your memories, transformed into light.',
}

// RootLayout wraps every page. The dark bg-zinc-950 here means the background
// is never white, even before content loads.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
