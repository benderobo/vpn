import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Use environment variable or default to the prisma_data mapped volume
const config = {
  url: process.env.DATABASE_URL || 'file:prisma_data/dev.db',
};

const adapter = new PrismaLibSql(config);

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
