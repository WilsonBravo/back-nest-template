import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  public readonly db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async onModuleInit() {
    await Promise.all([this.db.$connect()]);
  }

  async onModuleDestroy() {
    await Promise.all([this.db.$disconnect()]);
  }

  getDbClient(): PrismaClient {
    return this.db;
  }

  // Método para ejecutar transacciones
  async executeTransaction<T>(
    dbTransaction?: (prisma: PrismaClient) => Promise<T>,
  ): Promise<{ metrics?: T; location?: T }> {
    const results: { metrics?: T; db?: T; fasecolda?: T } = {};

    if (dbTransaction) {
      results.db = await this.db.$transaction(dbTransaction);
    }

    return results;
  }
}
