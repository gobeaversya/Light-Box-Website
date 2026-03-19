export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-amber-400">Tell Your Story</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            A small studio obsessed with turning photos into glowing 3D photo lamps.
          </p>
        </div>

        {/* Brand story */}
        <section className="mb-14 p-8 rounded-2xl border border-zinc-800 bg-zinc-900">
          <h2 className="text-2xl font-bold mb-5">Our Story</h2>
          {/* Replace this placeholder text with your real story */}
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              [Your story goes here — how you got into lithophanes, what drives you,
              what makes your work different. Be personal and specific. Customers
              who buy from small makers want to know who they're buying from.]
            </p>
            <p>
              [What started as a hobby quickly became something more. Every print
              is made by hand, checked before shipping, and sent out with care.]
            </p>
          </div>
        </section>

        {/* Printer photo placeholder */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-5">The Equipment</h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Print in process.jpg"
              alt="Bambu Lab A1 printing a 3D photo lamp"
              className="w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-zinc-100 mb-2">Bambu Lab A1</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Every 3D photo lamp is printed on a Bambu Lab A1 — a precision machine known for
                consistent, high-quality output. Its accuracy and reliability deliver the fine
                layer detail that lithophane printing demands.
              </p>
            </div>
          </div>
        </section>

        {/* Quality guarantee */}
        <section className="p-8 rounded-2xl border border-amber-400/20 bg-amber-400/5">
          <h2 className="text-2xl font-bold mb-5">Our Quality Guarantee</h2>
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
                <span className="text-amber-400 mt-0.5 shrink-0">{icon}</span>
                <div>
                  <div className="font-medium text-zinc-100 mb-1">{title}</div>
                  <div className="text-zinc-500 text-sm leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
