import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/orders — returns all orders, newest first.
// Protected by middleware (requires admin cookie).
export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(orders)
}
