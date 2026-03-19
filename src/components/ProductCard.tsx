import Link from 'next/link'

interface ProductCardProps {
  size: string
  slug: string
  price: number
  description: string
  popular?: boolean
}

export default function ProductCard({ size, slug, price, description, popular }: ProductCardProps) {
  return (
    // group allows child elements to react to hover on the parent with group-hover:
    <div className={`group relative flex flex-col rounded-2xl border bg-zinc-900 overflow-hidden transition-all duration-300
      hover:shadow-[0_0_40px_rgba(251,191,36,0.08)] hover:-translate-y-1
      ${popular ? 'border-amber-400/40' : 'border-zinc-800 hover:border-zinc-700'}`}
    >
      {popular && (
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-amber-400 text-zinc-950 text-xs font-bold rounded-full">
          Most Popular
        </div>
      )}

      {/* Photo placeholder — replace with real product photos when ready */}
      <div className="aspect-[4/5] bg-zinc-800 flex items-center justify-center border-b border-zinc-800 relative overflow-hidden">
        {/* Simulated glow effect to hint at the backlit lithophane look */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(251,191,36,0.12) 0%, transparent 65%)' }}
        />
        <div className="text-center relative z-10">
          <div className="text-5xl font-bold text-amber-400/30 mb-2 group-hover:text-amber-400/50 transition-colors">{size}</div>
          <div className="text-xs text-zinc-600">Photo coming soon</div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-zinc-100 mb-1">{size} Lithophane</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-400">${price}</span>
          <Link
            href={`/order?size=${slug}`}
            className="px-4 py-2 bg-zinc-800 hover:bg-amber-400 text-zinc-300 hover:text-zinc-950 rounded-lg text-sm font-medium transition-all"
          >
            Order This Size
          </Link>
        </div>
      </div>
    </div>
  )
}
