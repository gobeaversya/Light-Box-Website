import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-stone-300 bg-cream-50/90 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold text-forest-600 tracking-tight font-serif">Tell Your Story</span>
          <span className="text-stone-400 text-xs font-light hidden sm:inline">3D Photo Lamps</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className="px-3 py-2 text-sm text-stone-500 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100/70">
            Home
          </Link>
          <Link href="/about" className="px-3 py-2 text-sm text-stone-500 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100/70">
            About
          </Link>
          <Link
            href="/order"
            className="ml-2 px-4 py-2 bg-forest-600 text-cream-50 text-sm font-semibold rounded-full hover:bg-forest-700 transition-colors"
          >
            Order Now
          </Link>
        </div>
      </nav>
    </header>
  )
}
