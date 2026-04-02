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
    <div className={`group relative flex flex-col rounded-2xl border bg-white overflow-hidden transition-all duration-300
      hover:shadow-[0_8px_40px_rgba(0,0,0,0.14)] hover:-translate-y-1
      ${popular ? 'border-forest-500/40' : 'border-stone-300 hover:border-stone-300'}`}
    >
      {popular && (
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-forest-600 text-cream-50 text-xs font-bold rounded-full">
          Most Popular
        </div>
      )}

      {/* Photo placeholder — replace with real product photos when ready */}
      <div className="aspect-[4/5] bg-stone-100 flex items-center justify-center border-b border-stone-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(74,103,65,0.06) 0%, transparent 65%)' }}
        />
        <div className="text-center relative z-10">
          <div className="text-5xl font-bold text-forest-500/30 mb-2 group-hover:text-forest-500/50 transition-colors font-serif">{size}</div>
          <div className="text-xs text-stone-400">Photo coming soon</div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-stone-900 mb-1">{size} Lithophane</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-1">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-forest-600">${price}</span>
          <Link
            href={`/order?size=${slug}`}
            className="px-4 py-2 bg-stone-100 hover:bg-forest-600 text-stone-700 hover:text-cream-50 rounded-lg text-sm font-medium transition-all"
          >
            Order This Size
          </Link>
        </div>
      </div>
    </div>
  )
}
