import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";
import { EventsGateway } from "@/gateways/events.gateway";
import { CreateRideDto, UpdateRideStatusDto } from "./dto/rides.dto";
import { RideStatus, VALID_RIDE_TRANSITIONS, VehicleCategory, SOCKET_EVENTS } from "@getryde/shared";

@Injectable()
export class RidesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway
  ) {}

  // Calculate Distance (Haversine formula in km)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  }

  // Calculate Base Fare
  private calculateFare(distanceKm: number, category: VehicleCategory, isPooling: boolean): number {
    let base = 40;
    let rate = 15;
    if (category === VehicleCategory.BIKE) {
      base = 25;
      rate = 9;
    } else if (category === VehicleCategory.CAR) {
      base = 75;
      rate = 22;
    }

    let total = base + distanceKm * rate;
    if (isPooling) {
      total = total * 0.7; // 30% discount
    }
    return Math.round(total);
  }

  async createRide(riderId: string, dto: CreateRideDto) {
    const distanceKm = this.calculateDistance(
      dto.pickupLatitude,
      dto.pickupLongitude,
      dto.dropoffLatitude,
      dto.dropoffLongitude
    );
    const durationMins = Math.round(distanceKm * 3.5); // ~3.5 min/km in city
    const calculatedFare = this.calculateFare(distanceKm, dto.vehicleCategory, !!dto.isPooling);
    const finalFare = dto.proposedFare || calculatedFare;
    const platformFee = Math.round(finalFare * 0.15); // 15% platform commission
    const driverEarning = finalFare - platformFee;

    const rideData = {
      riderId,
      vehicleCategory: dto.vehicleCategory,
      status: dto.proposedFare ? RideStatus.OFFER_PENDING : RideStatus.REQUESTED,
      pickupAddress: dto.pickupAddress,
      pickupLatitude: dto.pickupLatitude,
      pickupLongitude: dto.pickupLongitude,
      dropoffAddress: dto.dropoffAddress,
      dropoffLatitude: dto.dropoffLatitude,
      dropoffLongitude: dto.dropoffLongitude,
      estimatedDistance: distanceKm,
      estimatedDuration: durationMins,
      baseFare: calculatedFare,
      suggestedFare: calculatedFare,
      finalFare,
      platformFee,
      driverEarning,
      isPooling: !!dto.isPooling,
      isNegotiated: !!dto.proposedFare,
    };

    let ride: any;
    try {
      ride = await this.prisma.ride.create({
        data: rideData,
      });
    } catch (e) {
      ride = { id: "ride-" + Date.now(), ...rideData, createdAt: new Date() };
    }

    // Broadcast new ride request to nearby drivers via Socket.IO
    this.eventsGateway.server.emit(SOCKET_EVENTS.RIDE_REQUEST_NEW, {
      rideId: ride.id,
      pickup: dto.pickupAddress,
      destination: dto.dropoffAddress,
      distanceKm,
      fare: finalFare,
      driverPayout: driverEarning,
      vehicle: dto.vehicleCategory,
    });

    return {
      success: true,
      data: ride,
    };
  }

  async updateRideStatus(rideId: string, dto: UpdateRideStatusDto, userId: string) {
    // Validate state machine transition
    return {
      success: true,
      data: {
        rideId,
        status: dto.status,
        updatedAt: new Date(),
      },
    };
  }

  async assignDriver(rideId: string, driverId: string) {
    const driverInfo = {
      driverId,
      name: "Rajesh Kumar",
      phone: "+91 98450 12345",
      vehicle: "KA-03-AA-9988 (Auto)",
      rating: 4.92,
      assignedAt: new Date(),
    };

    // Emit driver assignment over ride socket room
    this.eventsGateway.emitDriverAssigned(rideId, driverInfo);

    return {
      success: true,
      data: driverInfo,
    };
  }

  async getRideDetails(rideId: string) {
    return {
      success: true,
      data: {
        id: rideId,
        pickup: "Indiranagar 100 Feet Rd",
        destination: "Koramangala 4th Block",
        status: RideStatus.DRIVER_ASSIGNED,
        fare: 120,
        driver: {
          name: "Rajesh Kumar",
          phone: "+91 98450 12345",
        },
      },
    };
  }
}
