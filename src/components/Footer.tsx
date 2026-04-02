import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t-2 border-stone-300 bg-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-forest-600 font-bold font-serif">Tell Your Story</span>
          <span className="text-stone-400 text-xs">3D Photo Lamps</span>
        </div>
        <p className="text-stone-400">© {new Date().getFullYear()} Tell Your Story. All rights reserved.</p>
        <div className="flex items-center gap-4 text-stone-400">
          <Link href="/order" className="hover:text-stone-700 transition-colors">Order</Link>
          <Link href="/about" className="hover:text-stone-700 transition-colors">About</Link>
        </div>
      </div>
    </footer>
  )
}
