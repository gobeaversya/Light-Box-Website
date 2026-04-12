import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cream-50">
      <div className="max-w-md w-full text-center">
        {/* Glow effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-3xl bg-forest-500/15 rounded-full scale-150" />
          <div className="relative text-6xl text-forest-600">✦</div>
        </div>

        <p className="font-script text-forest-600 text-xl mb-2">thank you</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mb-4">Order Received</h1>
        <p className="text-stone-600 leading-relaxed mb-3">
          Thank you for your order. You'll receive a confirmation email from Stripe shortly.
        </p>
        <p className="text-stone-500 text-sm mb-10 leading-relaxed">
          We'll start working on your lithophane right away. Standard processing takes 5 to 7 business
          days (2 to 3 with rush). We'll be in touch when it ships.
        </p>

        <div className="p-4 rounded-xl border border-forest-500/20 bg-forest-500/5 text-forest-700 text-sm mb-8">
          Questions? Reply to your confirmation email and we'll get back to you.
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-3 border-2 border-stone-400 text-stone-700 rounded-full hover:border-stone-600 hover:text-stone-900 transition-colors font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
