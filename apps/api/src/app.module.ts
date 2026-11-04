import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RidesModule } from "./modules/rides/rides.module";
import { OffersModule } from "./modules/offers/offers.module";
import { PoolingModule } from "./modules/pooling/pooling.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { AssistantModule } from "./modules/assistant/assistant.module";
import { AdminModule } from "./modules/admin/admin.module";
import { EventsGateway } from "./gateways/events.gateway";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    RidesModule,
    OffersModule,
    PoolingModule,
    PaymentsModule,
    AssistantModule,
    AdminModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
