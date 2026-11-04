import { Module } from "@nestjs/common";
import { PoolingController } from "./pooling.controller";
import { PoolingService } from "./pooling.service";

@Module({
  controllers: [PoolingController],
  providers: [PoolingService],
  exports: [PoolingService],
})
export class PoolingModule {}
