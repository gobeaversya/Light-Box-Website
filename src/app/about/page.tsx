export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 bg-cream-50">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4 text-stone-900">
            About <span className="text-forest-600">Tell Your Story</span>
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            A small, one-person studio obsessed with turning photos into glowing 3D photo lamps.
          </p>
        </div>

        {/* Brand story */}
        <section className="mb-14 p-8 rounded-2xl border border-stone-300 bg-white shadow-sm">
          <p className="font-script text-forest-600 text-xl mb-2">the story behind the lamp</p>
          <h2 className="font-serif text-2xl font-semibold mb-5 text-stone-900">Our Story</h2>
          <div className="space-y-4 text-stone-600 leading-relaxed">
            <p>
              It started with an anniversary gift — a photo of us at the cherry blossoms in
              Washington, D.C., printed as a lithophane. I watched her hold it up to a window for
              the first time and see our photo glow in a way a framed print never could. That was
              the moment I knew this was something worth sharing.
            </p>
            <p>
              I got into 3D printing as a way to grow as an engineer — a hands-on, creative
              counterpart to the technical work I was already doing. Lithophanes turned out to be
              the perfect intersection: the precision of engineering and the intimacy of a personal
              photograph, combined into something you can hold in your hands.
            </p>
            <p>
              Tell Your Story exists because I wanted other people to experience that same moment —
              the quiet wonder of watching a memory come alive in light. Every lamp leaves here
              hand-checked and made with care. The reaction when someone sees their photo light up
              for the first time never gets old.
            </p>
          </div>
        </section>

        {/* Printer photo */}
        <section className="mb-14">
          <h2 className="font-serif text-2xl font-semibold mb-5 text-stone-900">The Equipment</h2>
          <div className="rounded-2xl border border-stone-300 bg-white overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Print in process.jpg"
              alt="Bambu Lab A1 printing a 3D photo lamp"
              className="w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-stone-900 mb-2">Bambu Lab A1</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Every 3D photo lamp is printed on a Bambu Lab A1 — a precision machine known for
                consistent, high-quality output. Its accuracy and reliability deliver the fine
                layer detail that lithophane printing demands.
              </p>
            </div>
          </div>
        </section>

        {/* Quality guarantee */}
        <section className="p-8 rounded-2xl border border-forest-500/20 bg-forest-500/5">
          <h2 className="font-serif text-2xl font-semibold mb-5 text-stone-900">Our Quality Guarantee</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '✦',
                title: 'Inspected Before Shipping',
                desc: 'Every piece is lit and checked before it leaves. If it doesn\'t look right, we reprint it.',
              },
              {
                icon: '✦',
                title: 'Photo Optimization',
                desc: 'We adjust contrast and detail for 3D printing — not just a straight conversion.',
              },
              {
                icon: '✦',
                title: 'Satisfaction Guarantee',
                desc: 'Not happy with your order? Contact us and we\'ll make it right.',
              },
              {
                icon: '✦',
                title: 'Secure Packaging',
                desc: 'Each 3D photo lamp is wrapped and boxed to survive shipping without damage.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="text-forest-600 mt-0.5 shrink-0">{icon}</span>
                <div>
                  <div className="font-medium text-stone-900 mb-1">{title}</div>
                  <div className="text-stone-600 text-sm leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
