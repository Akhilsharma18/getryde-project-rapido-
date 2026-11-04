import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";
import { EventsGateway } from "@/gateways/events.gateway";
import { SubmitOfferDto, RespondOfferDto } from "./dto/offers.dto";
import { OfferStatus, SOCKET_EVENTS } from "@getryde/shared";

@Injectable()
export class OffersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway
  ) {}

  async submitOffer(dto: SubmitOfferDto) {
    const expiresAt = new Date(Date.now() + 120 * 1000); // 120 seconds TTL

    // Broadcast offer received
    this.eventsGateway.server.emit(SOCKET_EVENTS.RIDE_OFFER_RECEIVED, {
      rideId: dto.rideId,
      amount: dto.amount,
      offeredBy: dto.offeredBy,
      expiresAt,
    });

    return {
      success: true,
      data: {
        id: "offer-" + Date.now(),
        rideId: dto.rideId,
        amount: dto.amount,
        status: OfferStatus.PENDING,
        expiresAt,
      },
    };
  }

  async respondToOffer(dto: RespondOfferDto, responderId: string) {
    if (dto.action === OfferStatus.COUNTERED) {
      if (!dto.counterAmount) {
        throw new BadRequestException("Counter amount is required for counter-offers");
      }

      this.eventsGateway.server.emit(SOCKET_EVENTS.RIDE_OFFER_COUNTERED, {
        offerId: dto.offerId,
        counterAmount: dto.counterAmount,
        driverId: responderId,
      });

      return {
        success: true,
        data: {
          offerId: dto.offerId,
          status: OfferStatus.COUNTERED,
          counterAmount: dto.counterAmount,
        },
      };
    }

    // Accepted or Rejected
    this.eventsGateway.server.emit(
      dto.action === OfferStatus.ACCEPTED
        ? SOCKET_EVENTS.RIDE_OFFER_ACCEPTED
        : SOCKET_EVENTS.RIDE_OFFER_REJECTED,
      {
        offerId: dto.offerId,
        responderId,
      }
    );

    return {
      success: true,
      data: {
        offerId: dto.offerId,
        status: dto.action,
      },
    };
  }
}
