'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Order = {
  id: string
  createdAt: Date
  customerName: string
  customerEmail: string
  size: string
  rush: boolean
  notes: string | null
  photoFilename: string | null
  photoLink: string | null
  amountPaid: number
  paymentStatus: string
  status: string
}

// Color config for each fulfillment status stage
const STATUS_CONFIG: Record<string, { badge: string; dot: string }> = {
  Pending:  { badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',  dot: 'bg-yellow-400' },
  Printing: { badge: 'bg-blue-500/15   text-blue-400   border-blue-500/30',    dot: 'bg-blue-400'   },
  Shipped:  { badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',  dot: 'bg-purple-400' },
  Complete: { badge: 'bg-green-500/15  text-green-400  border-green-500/30',   dot: 'bg-green-400'  },
}

const STATUSES = ['Pending', 'Printing', 'Shipped', 'Complete']

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG['Pending']
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  )
}

export default function OrderTable({ initialOrders }: { initialOrders: Order[] }) {
  // Local copy of orders so we can optimistically update status without a full page reload
  const [orders, setOrders] = useState(initialOrders)
  const [updating, setUpdating] = useState<string | null>(null) // order ID currently updating
  const router = useRouter()

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)

    // Optimistic update — change the UI immediately so it feels instant
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o))

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('Update failed')
      // Refresh server component data in the background (for next page load)
      router.refresh()
    } catch {
      // Roll back on failure
      setOrders(initialOrders)
      alert('Failed to update status. Please try again.')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
        >
          {/* Order header row */}
          <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-zinc-100 truncate">{order.customerName}</div>
              <div className="text-zinc-500 text-sm truncate">{order.customerEmail}</div>
            </div>
            <div className="text-zinc-500 text-sm shrink-0">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
              })}
            </div>
            {/* Payment status */}
            <span className={`px-2.5 py-1 rounded-full border text-xs font-medium shrink-0
              ${order.paymentStatus === 'paid'
                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                : 'bg-zinc-700/50 text-zinc-500 border-zinc-700'}`}
            >
              {order.paymentStatus === 'paid' ? '✓ Paid' : order.paymentStatus}
            </span>
          </div>

          {/* Order body */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">

            {/* Order details */}
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-wide mb-2">Order</div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">Size:</span>
                  <span className="text-zinc-100 font-medium">{order.size}"</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">Rush:</span>
                  <span className={order.rush ? 'text-amber-400 font-medium' : 'text-zinc-500'}>
                    {order.rush ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">Amount:</span>
                  <span className="text-zinc-100">${(order.amountPaid / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Photo */}
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-wide mb-2">Photo</div>
              <div className="space-y-2 text-sm">
                {order.photoFilename ? (
                  <a
                    href={order.photoFilename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    ⬇ View uploaded photo
                  </a>
                ) : (
                  <span className="text-zinc-600 text-xs">No file uploaded</span>
                )}
                {order.photoLink && (
                  <div>
                    <a
                      href={order.photoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      ↗ Open drive link
                    </a>
                  </div>
                )}
                {!order.photoFilename && !order.photoLink && (
                  <span className="text-red-400 text-xs">⚠ No photo provided</span>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-wide mb-2">Notes</div>
              {order.notes ? (
                <p className="text-zinc-300 text-sm leading-relaxed">{order.notes}</p>
              ) : (
                <span className="text-zinc-600 text-sm">none</span>
              )}
            </div>

            {/* Status control */}
            <div>
              <div className="text-xs text-zinc-600 uppercase tracking-wide mb-2">Status</div>
              <div className="space-y-2">
                <StatusBadge status={order.status} />
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={updating === order.id}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200
                    focus:outline-none focus:border-amber-400/50 disabled:opacity-50 cursor-pointer"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
