import { Module } from "@nestjs/common";
import { RidesController } from "./rides.controller";
import { RidesService } from "./rides.service";
import { EventsGateway } from "@/gateways/events.gateway";

@Module({
  controllers: [RidesController],
  providers: [RidesService, EventsGateway],
  exports: [RidesService],
})
export class RidesModule {}
