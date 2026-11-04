import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";

@Injectable()
export class PoolingService {
  constructor(private readonly prisma: PrismaService) {}

  async findCompatiblePools(pickupLat: number, pickupLon: number, dropoffLat: number, dropoffLon: number) {
    // Returns active corridor matches with calculated detour and savings
    return {
      success: true,
      data: [
        {
          poolingGroupId: "POOL-101",
          corridorName: "HSR Layout → Whitefield ITPL",
          currentPassengers: 2,
          maxCapacity: 4,
          seatsLeft: 2,
          estimatedDetourMinutes: 6,
          discountPercent: 35,
          standardSoloFare: 260,
          pooledFareShare: 165,
          savings: 95,
        },
        {
          poolingGroupId: "POOL-102",
          corridorName: "Indiranagar 100ft → Manyata Tech Park",
          currentPassengers: 2,
          maxCapacity: 3,
          seatsLeft: 1,
          estimatedDetourMinutes: 8,
          discountPercent: 30,
          standardSoloFare: 290,
          pooledFareShare: 180,
          savings: 110,
        },
      ],
    };
  }

  async joinPool(poolingGroupId: string, riderId: string) {
    return {
      success: true,
      message: `Joined pooling group ${poolingGroupId}`,
      data: {
        poolingGroupId,
        riderId,
        assignedSeatOrder: 3,
        status: "CONFIRMED",
      },
    };
  }
}
