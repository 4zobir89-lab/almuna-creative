import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient | null {
  const dbUrl = process.env.DATABASE_URL;

  // No DATABASE_URL — use fallback data
  if (!dbUrl) {
    console.log('ℹ️ No DATABASE_URL — using fallback data');
    return null;
  }

  // Check for placeholder values (user hasn't replaced them yet)
  if (
    dbUrl.includes('PASSWORD') ||
    dbUrl.includes('HOSTNAME') ||
    dbUrl.includes('PORT') ||
    dbUrl.includes('placeholder') ||
    dbUrl.includes('your-app-name')
  ) {
    console.log('ℹ️ DATABASE_URL contains placeholder values — using fallback data');
    return null;
  }

  // Must be PostgreSQL URL
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
