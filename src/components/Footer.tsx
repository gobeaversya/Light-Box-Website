import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold">Tell Your Story</span>
          <span className="text-zinc-600 text-xs">3D Photo Lamps</span>
        </div>
        <p className="text-zinc-600">© {new Date().getFullYear()} Tell Your Story. All rights reserved.</p>
        <div className="flex items-center gap-4 text-zinc-500">
          <Link href="/order" className="hover:text-zinc-300 transition-colors">Order</Link>
          <Link href="/about" className="hover:text-zinc-300 transition-colors">About</Link>
        </div>
      </div>
    </footer>
  )
}
