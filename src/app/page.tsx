import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

const products = [
  {
    size: '4×5"',
    slug: '4x5',
    price: 40,
    description: 'Perfect for a bedside table, desk, or shelf. Most popular size for single portraits.',
  },
  {
    size: '6×8"',
    slug: '6x8',
    price: 60,
    description: 'Great for group photos and landscapes. Makes a stunning centerpiece or gift.',
    popular: true,
  },
  {
    size: '8×10"',
    slug: '8x10',
    price: 80,
    description: 'Maximum impact. Your most cherished photo displayed at full, dramatic scale.',
  },
]

const reviews = [
  {
    name: 'Sarah M.',
    text: 'Absolutely stunning gift for my mom. The photo of our family glows so beautifully. She cried.',
    stars: 5,
  },
  {
    name: 'James T.',
    text: "Ordered the large for our wedding photo. It's the centerpiece of our living room. People ask about it every time.",
    stars: 5,
  },
  {
    name: 'Priya K.',
    text: 'Fast shipping, incredible quality. The detail in the backlit photo is unreal. Already ordered my second one.',
    stars: 5,
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered radial gradients simulate warm backlighting from behind the photo */}
        <div className="absolute inset-0 bg-zinc-950" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 55%, rgba(251,191,36,0.07) 0%, transparent 65%)',
          }}
        />
        <div className="absolute w-80 h-80 rounded-full blur-[120px] bg-amber-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 pb-32">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-400 text-xs font-medium mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Handcrafted · 3D Printed · Glowing
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Your Photo,{' '}
            <br className="hidden sm:block" />
            <span className="text-amber-400">Transformed Into Light</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            3D photo lamps reveal your photo as a dramatic glow when backlit — made using a technique
            called lithophane. Dark, moody, and deeply personal. The perfect keepsake or gift.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/order"
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 text-zinc-950 rounded-full font-semibold text-lg
                hover:bg-amber-300 transition-all hover:shadow-[0_0_40px_rgba(251,191,36,0.25)] active:scale-95"
            >
              Order Yours — From $40
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 border border-zinc-700 text-zinc-300 rounded-full font-medium text-lg
                hover:border-zinc-500 hover:text-zinc-100 transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 text-xs">
            <span>Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── What is a Lithophane ─────────────────────────────────────────── */}
      <section className="py-24 bg-zinc-900/40 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How does a <span className="text-amber-400">3D photo lamp</span> work?
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mb-14">
            We 3D print your photo using a technique called lithophane — varying the thickness of
            the material so light passes through at different intensities. In daylight it looks like
            a white relief panel. Backlit, your photo glows with stunning depth and contrast.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: '▪',
                label: 'Displayed Dark',
                desc: 'On a shelf or hanging on the wall, it looks like a beautiful white relief panel.',
              },
              {
                icon: '✦',
                label: 'Lit From Behind',
                desc: 'Plug in a simple light source and your photo glows dramatically from the inside.',
              },
              {
                icon: '◈',
                label: 'Deeply Personal',
                desc: 'Any photo becomes a one-of-a-kind piece. No two are ever identical.',
              },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60">
                <div className="text-2xl text-amber-400/60 mb-3">{icon}</div>
                <div className="font-semibold text-zinc-100 mb-2">{label}</div>
                <div className="text-zinc-500 text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Cards ────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Choose Your Size</h2>
            <p className="text-zinc-400">All sizes include design optimization. Flat $9 shipping.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-zinc-400">Three steps from photo to glowing art on your shelf</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Upload Your Photo',
                desc: 'Choose any photo — portrait, family moment, pet, or landscape. Upload directly or share a Google Drive / Dropbox link.',
              },
              {
                step: '02',
                title: 'We Print & Inspect',
                desc: 'Your photo is converted to a precision 3D model and printed on our Bambu Lab printer. Every piece is quality-checked before it leaves.',
              },
              {
                step: '03',
                title: 'You Receive Magic',
                desc: 'Your 3D photo lamp arrives ready to display. Hold it to a window or use the included light source — watch your photo come alive.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-bold text-amber-400/15 mb-3 leading-none">{step}</div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-3">{title}</h3>
                <p className="text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">What Customers Say</h2>
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <span>{'★★★★★'}</span>
              <span className="text-zinc-500 text-sm">5.0 average · 50+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(({ name, text, stars }) => (
              <div key={name} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60">
                <div className="text-amber-400 text-sm mb-3">{'★'.repeat(stars)}</div>
                <p className="text-zinc-300 leading-relaxed mb-4">"{text}"</p>
                <p className="text-zinc-500 text-sm">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-zinc-900/30 border-t border-zinc-800/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to see your photo <span className="text-amber-400">glow</span>?
          </h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Starting at $40 with flat-rate $9 shipping. Ships within 5–7 business days,
            or 2–3 days with rush processing.
          </p>
          <Link
            href="/order"
            className="inline-block px-10 py-4 bg-amber-400 text-zinc-950 rounded-full font-semibold text-lg
              hover:bg-amber-300 transition-all hover:shadow-[0_0_50px_rgba(251,191,36,0.25)]"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </>
  )
}
