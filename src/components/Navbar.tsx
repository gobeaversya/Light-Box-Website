import Link from 'next/link'

export default function Navbar() {
  return (
    // sticky + backdrop-blur makes the nav "float" over scrolling content with a frosted glass effect
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold text-amber-400 tracking-tight">Tell Your Story</span>
          <span className="text-zinc-600 text-xs font-light hidden sm:inline">3D Photo Lamps</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800/50">
            Home
          </Link>
          <Link href="/about" className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors rounded-lg hover:bg-zinc-800/50">
            About
          </Link>
          <Link
            href="/order"
            className="ml-2 px-4 py-2 bg-amber-400 text-zinc-950 text-sm font-semibold rounded-full hover:bg-amber-300 transition-colors"
          >
            Order Now
          </Link>
        </div>
      </nav>
    </header>
  )
}
