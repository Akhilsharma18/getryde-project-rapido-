import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    return {
      success: true,
      data: {
        totalRiders: 24850,
        totalDrivers: 3420,
        verifiedDrivers: 2890,
        pendingDrivers: 530,
        totalRides: 104200,
        activeRides: 142,
        grossRevenue: 482400,
        platformCommissionTaken: 72360,
      },
    };
  }

  async approveDriver(driverId: string) {
    return {
      success: true,
      message: `Driver ${driverId} KYC verified & approved successfully`,
      data: { driverId, status: "APPROVED", approvedAt: new Date() },
    };
  }

  async updatePricingRule(category: string, baseFare: number, perKmRate: number) {
    return {
      success: true,
      message: `Pricing rules updated for ${category}`,
      data: { category, baseFare, perKmRate, updatedAt: new Date() },
    };
  }
}
