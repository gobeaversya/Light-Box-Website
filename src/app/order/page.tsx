import { Suspense } from 'react'
import OrderForm from './OrderForm'

// useSearchParams() (used inside OrderForm) requires a Suspense boundary.
// Without it, Next.js would fail to statically analyze the page during build.
// The Suspense wrapper tells Next.js: "render this part dynamically on request."
export default function OrderPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Order Your Lithophane</h1>
          <p className="text-zinc-400">Upload your photo, choose your size, and we'll handle the rest.</p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-zinc-500 animate-pulse">Loading order form…</div>
            </div>
          }
        >
          <OrderForm />
        </Suspense>
      </div>
    </div>
  )
}
