import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log("Connected to PostgreSQL via Prisma");
    } catch (err) {
      console.warn("Could not connect to PostgreSQL database directly:", err);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
