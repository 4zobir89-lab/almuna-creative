import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient | null {
  const dbUrl = process.env.DATABASE_URL;

  // No DATABASE_URL — use fallback data
  if (!dbUrl || dbUrl.includes('placeholder')) {
    console.log('ℹ️ No DATABASE_URL — using fallback data');
    return null;
  }

  // Validate URL format (must be postgresql://user:pass@host:port/db)
  if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
    console.log('ℹ️ DATABASE_URL is not PostgreSQL — using fallback data');
    return null;
  }

  try {
    return new PrismaClient({
      log: ['error'],
    });
  } catch (e) {
    console.error('❌ PrismaClient creation failed:', e);
    return null;
  }
}

export const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalThis.prisma = prisma;
}
