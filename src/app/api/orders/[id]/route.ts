import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const VALID_STATUSES = ['Pending', 'Printing', 'Shipped', 'Complete']

// PATCH /api/orders/:id — updates the fulfillment status of an order.
// Protected by middleware (requires admin cookie).
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { status } = await request.json()

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  try {
    const order = await prisma.order.update({
      where: { id: params.id },
      data:  { status },
    })
    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }
}
