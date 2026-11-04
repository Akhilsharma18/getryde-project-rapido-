import { Module } from "@nestjs/common";
import { OffersController } from "./offers.controller";
import { OffersService } from "./offers.service";
import { EventsGateway } from "@/gateways/events.gateway";

@Module({
  controllers: [OffersController],
  providers: [OffersService, EventsGateway],
  exports: [OffersService],
})
export class OffersModule {}
