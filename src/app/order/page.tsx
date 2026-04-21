import type { Metadata } from 'next'
import { Suspense } from 'react'
import OrderForm from './OrderForm'

export const metadata: Metadata = {
  title: 'Order Your 3D Photo Lamp',
  description:
    'Upload your photo and order a custom 3D-printed lithophane lamp. 6.5x6.5 inch size, $39.99 with flat-rate $9 shipping. Rush processing available.',
}

// useSearchParams() (used inside OrderForm) requires a Suspense boundary.
// Without it, Next.js would fail to statically analyze the page during build.
// The Suspense wrapper tells Next.js: "render this part dynamically on request."
export default function OrderPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-cream-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="font-script text-forest-600 text-xl mb-2">turn a photo into light</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mb-2">
            Order Your <span className="text-forest-600">3D Photo Lamp</span>
          </h1>
          <p className="text-stone-600">Upload your photo, add any notes, and we'll handle the rest.</p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-stone-500 animate-pulse">Loading order form…</div>
            </div>
          }
        >
          <OrderForm />
        </Suspense>
      </div>
    </div>
  )
}
