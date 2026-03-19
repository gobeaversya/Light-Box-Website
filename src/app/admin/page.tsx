// This is a Server Component — it runs on the server and can directly query the database.
// No API route needed; Prisma runs server-side only.
// The middleware in src/middleware.ts already verified the admin password before this page loads.
import { prisma } from '@/lib/prisma'
import OrderTable from './OrderTable'

// Tell Next.js not to cache this page — we always want fresh order data
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }, // Newest first
  })

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Orders</h1>
            <p className="text-zinc-500 text-sm mt-1">{orders.length} total orders</p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 text-sm border border-zinc-700 text-zinc-400 rounded-lg hover:text-zinc-200 hover:border-zinc-600 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 text-zinc-600">
            <div className="text-4xl mb-4">📭</div>
            <p>No orders yet. Share your link and they'll start coming in!</p>
          </div>
        ) : (
          // OrderTable is a Client Component — it handles interactive status updates
          <OrderTable initialOrders={orders} />
        )}
      </div>
    </div>
  )
}
