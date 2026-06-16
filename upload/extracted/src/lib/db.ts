import { PrismaClient } from '@prisma/client';
import { neonConfig, Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

// تكتيك هندسي: استخدام محرك الويب المدمج في النظام بدلاً من الحزمة الخارجية
// هذا التعديل يمنع انهيار C++ في بيئة Termux (Android)
if (typeof globalThis.WebSocket !== 'undefined') {
  neonConfig.webSocketConstructor = globalThis.WebSocket;
}

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient({
  adapter,
  log: ['error', 'warn']
});

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
