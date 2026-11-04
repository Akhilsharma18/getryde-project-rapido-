import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminService } from "./admin.service";

@ApiTags("Admin Management")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("stats")
  @ApiOperation({ summary: "Get live platform operational metrics" })
  async getStats() {
    return this.adminService.getDashboardStats();
  }

  @Post("drivers/:id/approve")
  @ApiOperation({ summary: "Approve driver KYC and activate on platform" })
  async approveDriver(@Param("id") id: string) {
    return this.adminService.approveDriver(id);
  }

  @Post("pricing")
  @ApiOperation({ summary: "Update vehicle category pricing" })
  async updatePricing(
    @Body("category") category: string,
    @Body("baseFare") baseFare: number,
    @Body("perKmRate") perKmRate: number
  ) {
    return this.adminService.updatePricingRule(category, baseFare, perKmRate);
  }
}
