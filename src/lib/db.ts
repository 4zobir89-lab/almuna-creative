import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️ DATABASE_URL not set — admin will use fallback data');
      return null;
    }
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
