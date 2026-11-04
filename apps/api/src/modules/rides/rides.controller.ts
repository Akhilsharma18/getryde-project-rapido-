import { Controller, Post, Get, Patch, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { RidesService } from "./rides.service";
import { CreateRideDto, UpdateRideStatusDto } from "./dto/rides.dto";

@ApiTags("Rides")
@Controller("rides")
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new ride request with route and fare estimation" })
  async createRide(@Body() dto: CreateRideDto) {
    const mockRiderId = "rider-demo-user";
    return this.ridesService.createRide(mockRiderId, dto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve ride details, status, and assigned driver" })
  async getRide(@Param("id") id: string) {
    return this.ridesService.getRideDetails(id);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Update ride state according to state machine transitions" })
  async updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdateRideStatusDto
  ) {
    return this.ridesService.updateRideStatus(id, dto, "admin-or-driver");
  }

  @Post(":id/assign-driver")
  @ApiOperation({ summary: "Assign driver atomically to ride request" })
  async assignDriver(
    @Param("id") id: string,
    @Body("driverId") driverId: string
  ) {
    return this.ridesService.assignDriver(id, driverId);
  }
}
