import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

const product = {
  size: '6.5×6.5"',
  slug: 'standard',
  price: 39.99,
  description: 'Our standard square 3D photo lamp. Perfect for a bedside table, desk, or shelf. Any photo you love, transformed into glowing light.',
}

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
    name: 'Riya D.',
    text: 'Fast shipping, incredible quality. The detail in the backlit photo is unreal. Already ordered my second one.',
    stars: 5,
  },
]

// Ordered so the CSS masonry (columns-3 on desktop) reads as three clean color
// blocks — left col rose, middle col violet with a forest-green Gift card as the
// focal point, right col amber. Gives a warm → cool → warm rhythm across the grid.
const useCases = [
  // Left column — Love & Memory (rose)
  {
    emoji: '🌸',
    title: 'Cherry Blossoms',
    story: 'She kept the cherry blossom photo on her phone for two years, waiting for the right frame. Now it glows.',
    style: 'bg-rose-50 border-rose-200/60',
  },
  {
    emoji: '💍',
    title: 'Anniversaries & Weddings',
    story: 'The proposal photo, backlit on the mantle. The first dance, glowing on the bookshelf. The one she always wanted to frame.',
    style: 'bg-rose-50 border-rose-200/60',
  },
  {
    emoji: '🐾',
    title: 'Pet Portraits',
    story: 'A lot of people order these as memorials. Before they were gone, they were your whole world. It means something to have them glow softly on your shelf.',
    style: 'bg-rose-50 border-rose-200/60',
  },
  {
    emoji: '🏠',
    title: 'Family Moments',
    story: "The photo you've been meaning to frame for three years. Frame it in light.",
    style: 'bg-rose-50 border-rose-200/60',
  },

  // Middle column — Creative (violet) with the Gift as focal point
  {
    emoji: '🐉',
    title: 'Fantasy & Hobbies',
    story: 'Their DnD character art from three years of campaigns. Custom printed, one of a kind, and they will lose their mind when they see it.',
    style: 'bg-violet-50 border-violet-200/60',
  },
  {
    emoji: '🎁',
    title: "The Gift Nobody Expects",
    story: "If you're stuck on a gift for someone who has everything, this is it. They will not see it coming.",
    style: 'bg-forest-500/10 border-forest-500/30',
  },
  {
    emoji: '🎸',
    title: 'Album Covers & Music',
    story: 'Your favorite record in 3D. Their first show.',
    style: 'bg-violet-50 border-violet-200/60',
  },
  {
    emoji: '📚',
    title: 'Book Covers & Art',
    story: 'Your favorite book cover, a piece of fan art, or an illustration that lives in your head rent-free.',
    style: 'bg-violet-50 border-violet-200/60',
  },

  // Right column — Moments & Milestones (amber)
  {
    emoji: '🏀',
    title: 'Sports Moments',
    story: 'Last season. His number. Forever lit.',
    style: 'bg-amber-50 border-amber-200/60',
  },
  {
    emoji: '🏒',
    title: 'Lacrosse & Hockey',
    story: 'The action shot nobody else has. The one where you can actually see their face.',
    style: 'bg-amber-50 border-amber-200/60',
  },
  {
    emoji: '🎓',
    title: 'Graduation Day',
    story: 'The photo your mom has been asking you to print for six months.',
    style: 'bg-amber-50 border-amber-200/60',
  },
  {
    emoji: '✨',
    title: 'Fairy Lights & Nature',
    story: 'Golden hour. String lights on a porch. The kind of photo that looks better backlit than any other way.',
    style: 'bg-amber-50 border-amber-200/60',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-50">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(139,109,74,0.06) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 pb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-forest-500/30 bg-forest-500/5 text-forest-600 text-xs font-medium mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" />
            Handcrafted · 3D Printed · Glowing
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1] text-stone-900">
            Your Photo,{' '}
            <br className="hidden sm:block" />
            <span className="text-forest-600">Transformed Into Light</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-4 leading-relaxed font-sans">
            A sports moment. A wedding dance. Cherry blossoms in the spring. A DnD character
            that took three sessions to build. Whatever photo holds the memory, we turn it
            into a glowing 3D lamp, made by hand.
          </p>

          <p className="font-script text-2xl text-stone-500 mb-10">made one at a time, by hand ✦</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/order"
              className="w-full sm:w-auto px-8 py-4 bg-forest-600 text-cream-50 rounded-full font-semibold text-lg
                hover:bg-forest-700 transition-all shadow-[0_4px_14px_rgba(59,85,48,0.35)] hover:shadow-[0_8px_28px_rgba(59,85,48,0.45)] active:scale-95"
            >
              Order Yours · $39.99
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-4 border-2 border-stone-400 text-stone-700 rounded-full font-semibold text-lg
                hover:border-stone-600 hover:text-stone-900 transition-colors"
            >
              Our Story
            </Link>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-stone-500 text-xs">
            <span>Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── See It In Action (hidden — add back when a real MP4 is available) ─
      <section className="py-20 bg-cream-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-3 text-stone-900">
            See It <span className="text-forest-600">Come Alive</span>
          </h2>
          <p className="text-stone-600 mb-8">Dark panel. Add light. Watch your photo appear.</p>
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm">
            <video autoPlay muted loop playsInline className="w-full relative z-10">
              <source src="/working-lithophane.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      ──────────────────────────────────────────────────────────────────────── */}

      {/* ── Any Photo Section ─────────────────────────────────────────────── */}
      <section className="py-24 bg-stone-100 border-y border-stone-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-3 text-stone-900">
              Any photo. Any story. Any memory.
            </h2>
            <p className="font-script text-2xl text-stone-500">here's what people are turning into lamps</p>
          </div>

          {/* Masonry via CSS columns */}
          <div className="columns-2 md:columns-3 gap-4">
            {useCases.map(({ emoji, title, story, style }) => (
              <div
                key={title}
                className={`break-inside-avoid mb-4 p-5 rounded-2xl border shadow-sm ${style}`}
              >
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-semibold text-stone-900 mb-2 text-sm">{title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{story}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/order"
              className="inline-block px-8 py-3 bg-forest-600 text-cream-50 rounded-full font-semibold hover:bg-forest-700 transition-all shadow-[0_4px_14px_rgba(59,85,48,0.35)] hover:shadow-[0_8px_28px_rgba(59,85,48,0.45)]"
            >
              Turn Your Photo Into a Lamp
            </Link>
          </div>
        </div>
      </section>

      {/* ── What is a Lithophane ─────────────────────────────────────────── */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4 text-stone-900">
            How does a <span className="text-forest-600">3D photo lamp</span> work?
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed mb-14">
            We 3D print your photo using a technique called lithophane, varying the thickness of
            the material so light passes through at different intensities. In daylight it looks like
            a beautiful white relief panel. Backlit, your photo glows with stunning depth and contrast.
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
              <div key={label} className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm">
                <div className="text-2xl text-forest-500/50 mb-3">{icon}</div>
                <div className="font-semibold text-stone-900 mb-2">{label}</div>
                <div className="text-stone-600 text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-stone-100 border-y border-stone-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-3 text-stone-900">Our 3D Photo Lamp</h2>
            <p className="text-stone-600">Includes design optimization. Flat $9 shipping.</p>
          </div>
          <ProductCard {...product} />
        </div>
      </section>

      {/* ── Custom Quote ─────────────────────────────────────────────────── */}
      <section id="custom" className="py-24 bg-cream-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-script text-forest-600 text-xl mb-3">want something different?</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4 text-stone-900">
            Custom <span className="text-forest-600">Quotes</span>
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-8">
            Want a different size, a colored background, a unique shape, or a larger bulk order?
            Send a quick message with what you have in mind and we'll reply with a quote.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
            {[
              { title: 'Custom Sizes', desc: 'Larger formats, panoramic, or miniature sizes.' },
              { title: 'Colored Backgrounds', desc: 'Choose a background color to match your space.' },
              { title: 'Bulk & Wedding Orders', desc: 'Favors, multi-photo sets, and group gifts.' },
            ].map(({ title, desc }) => (
              <div key={title} className="p-5 rounded-2xl border border-stone-200 bg-white shadow-sm">
                <div className="font-semibold text-stone-900 mb-1 text-sm">{title}</div>
                <div className="text-stone-600 text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
          {/* TODO: replace the mailto address below with your real contact email */}
          <a
            href="mailto:dakota.story26@gmail.com?subject=Custom%20Lithophane%20Quote"
            className="inline-block px-8 py-3 bg-forest-600 text-cream-50 rounded-full font-semibold hover:bg-forest-700 transition-all shadow-[0_4px_14px_rgba(59,85,48,0.35)] hover:shadow-[0_8px_28px_rgba(59,85,48,0.45)]"
          >
            Request a Quote
          </a>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-3 text-stone-900">How It Works</h2>
            <p className="text-stone-600">Three steps from photo to glowing art on your shelf</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Upload Your Photo',
                desc: 'Choose any photo: portrait, family moment, pet, or landscape. Upload directly or share a Google Drive / Dropbox link.',
              },
              {
                step: '02',
                title: 'We Print & Inspect',
                desc: 'Your photo is converted to a precision 3D model and printed on our Bambu Lab printer. Every piece is quality-checked before it leaves.',
              },
              {
                step: '03',
                title: 'You Receive Magic',
                desc: 'Your 3D photo lamp arrives ready to display. Hold it to a window or use the included light source, and watch your photo come alive.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="font-serif text-6xl font-semibold text-forest-500/15 mb-3 leading-none">{step}</div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">{title}</h3>
                <p className="text-stone-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Started ───────────────────────────────────────────────── */}
      <section className="py-24 bg-stone-100 border-y border-stone-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="font-script text-forest-600 text-xl mb-3">a note from the maker</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-6 text-stone-900 leading-snug">
                It started with a gift.
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  My first lithophane was an anniversary gift for my girlfriend, a photo of us at the
                  cherry blossoms in Washington, D.C. I watched her hold it up to a window and see our
                  photo glow in a way a framed print never could. That was the moment.
                </p>
                <p>
                  I got into 3D printing to grow as an engineer, a hands-on outlet alongside my
                  technical work. Lithophanes turned out to be the perfect intersection of precision
                  and something deeply personal.
                </p>
                <p>
                  Every lamp is still made by hand, start to finish. The reaction when someone sees
                  their photo light up for the first time never gets old.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/unlit blossoms.jpeg"
                  alt="Cherry blossom lithophane unlit"
                  className="w-full h-full object-cover object-[center_40%]"
                />
                <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                  unlit
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Lit up Blossoms.jpeg"
                  alt="Cherry blossom lithophane lit up"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                  lit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-3 text-stone-900">What Customers Say</h2>
            <div className="flex items-center justify-center gap-2 text-forest-500">
              <span>{'★★★★★'}</span>
              <span className="text-stone-500 text-sm">5.0 average · 50+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(({ name, text, stars }) => (
              <div key={name} className="p-6 rounded-2xl border border-stone-200 bg-white shadow-sm">
                <div className="text-forest-500 text-sm mb-3">{'★'.repeat(stars)}</div>
                <p className="text-stone-600 leading-relaxed mb-4">"{text}"</p>
                <p className="text-stone-500 text-sm">· {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-stone-100 border-t border-stone-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4 text-stone-900">
            Ready to see your photo <span className="text-forest-600">glow</span>?
          </h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            $39.99 with flat-rate $9 shipping. Ships within 5 to 7 business days,
            or 2–3 days with rush processing.
          </p>
          <Link
            href="/order"
            className="inline-block px-10 py-4 bg-forest-600 text-cream-50 rounded-full font-semibold text-lg
              hover:bg-forest-700 transition-all shadow-[0_4px_14px_rgba(59,85,48,0.35)] hover:shadow-[0_8px_28px_rgba(59,85,48,0.45)]"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </>
  )
}
