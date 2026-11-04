import { Controller, Get, Post, Query, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PoolingService } from "./pooling.service";

@ApiTags("Smart Pooling")
@Controller("pooling")
export class PoolingController {
  constructor(private readonly poolingService: PoolingService) {}

  @Get("search")
  @ApiOperation({ summary: "Find compatible pooling groups within detour limits" })
  async search(
    @Query("pickupLat") pLat: number,
    @Query("pickupLon") pLon: number,
    @Query("dropoffLat") dLat: number,
    @Query("dropoffLon") dLon: number
  ) {
    return this.poolingService.findCompatiblePools(
      Number(pLat || 12.9716),
      Number(pLon || 77.5946),
      Number(dLat || 12.9352),
      Number(dLon || 77.6245)
    );
  }

  @Post(":id/join")
  @ApiOperation({ summary: "Join an active ride pool" })
  async joinPool(
    @Param("id") id: string,
    @Body("riderId") riderId: string
  ) {
    return this.poolingService.joinPool(id, riderId || "rider-demo-user");
  }
}
