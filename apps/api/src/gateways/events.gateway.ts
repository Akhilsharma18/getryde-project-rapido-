import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "@getryde/shared";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(`user:${userId}`);
    }
    console.log(`Socket client connected: ${client.id} (user: ${userId})`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Socket client disconnected: ${client.id}`);
  }

  // Join a dedicated room for a ride
  @SubscribeMessage("join:ride")
  handleJoinRide(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { rideId: string }
  ) {
    client.join(`ride:${data.rideId}`);
    return { event: "joined:ride", data: { rideId: data.rideId } };
  }

  // Driver Location broadcast
  @SubscribeMessage(SOCKET_EVENTS.DRIVER_LOCATION_UPDATE)
  handleDriverLocation(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      driverId: string;
      rideId?: string;
      latitude: number;
      longitude: number;
      heading?: number;
    }
  ) {
    if (data.rideId) {
      this.server.to(`ride:${data.rideId}`).emit(SOCKET_EVENTS.DRIVER_LOCATION_UPDATE, data);
    }
    // Also broadcast to nearby riders channel
    this.server.emit("driver:nearby:update", data);
  }

  // Ride Offer Received (Negotiation)
  @SubscribeMessage(SOCKET_EVENTS.RIDE_OFFER_RECEIVED)
  handleOfferReceived(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { rideId: string; offerAmount: number; offeredBy: string }
  ) {
    this.server.to(`ride:${data.rideId}`).emit(SOCKET_EVENTS.RIDE_OFFER_RECEIVED, data);
  }

  // Ride Offer Countered
  @SubscribeMessage(SOCKET_EVENTS.RIDE_OFFER_COUNTERED)
  handleOfferCountered(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { rideId: string; counterAmount: number; driverId: string }
  ) {
    this.server.to(`ride:${data.rideId}`).emit(SOCKET_EVENTS.RIDE_OFFER_COUNTERED, data);
  }

  // Driver Assigned
  emitDriverAssigned(rideId: string, driverData: any) {
    this.server.to(`ride:${rideId}`).emit(SOCKET_EVENTS.RIDE_DRIVER_ASSIGNED, driverData);
  }

  // Trip Status changes
  emitRideStatusChange(rideId: string, eventName: string, payload: any) {
    this.server.to(`ride:${rideId}`).emit(eventName, payload);
  }

  // Send private user notification
  emitUserNotification(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit(SOCKET_EVENTS.NOTIFICATION_NEW, notification);
  }
}
