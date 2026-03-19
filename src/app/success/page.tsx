import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Glow effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-3xl bg-amber-400/10 rounded-full scale-150" />
          <div className="relative text-6xl">✦</div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Order Received!</h1>
        <p className="text-zinc-400 leading-relaxed mb-3">
          Thank you for your order. You'll receive a confirmation email from Stripe shortly.
        </p>
        <p className="text-zinc-500 text-sm mb-10 leading-relaxed">
          We'll start working on your lithophane right away. Standard processing takes 5–7 business
          days (2–3 with rush). We'll be in touch when it ships.
        </p>

        <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5 text-amber-300 text-sm mb-8">
          Questions? Reply to your confirmation email and we'll get back to you.
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-3 border border-zinc-700 text-zinc-300 rounded-full hover:border-zinc-500 hover:text-zinc-100 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
