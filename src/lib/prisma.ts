import { PrismaClient } from '@prisma/client'

// This pattern prevents creating too many database connections during development.
// Next.js hot-reloads your code on every save, which would create a new PrismaClient
// each time — eventually exhausting your connection pool. By attaching it to `globalThis`
// (which persists across hot reloads), we reuse the same connection.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
