import { PrismaClient } from 'apps/administrator-service/prisma/generated/client';

// Scoped transaction type
export type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;
