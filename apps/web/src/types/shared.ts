// User types
export enum UserRole {
  RIDER = 'RIDER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

export enum DriverStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export enum DriverAvailability {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  ON_TRIP = 'ON_TRIP',
}

export enum VehicleCategory {
  BIKE = 'BIKE',
  AUTO = 'AUTO',
  CAR = 'CAR',
}

export enum VehicleStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export enum DocumentType {
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  VEHICLE_REGISTRATION = 'VEHICLE_REGISTRATION',
  INSURANCE = 'INSURANCE',
  PERMIT = 'PERMIT',
  IDENTITY_PROOF = 'IDENTITY_PROOF',
  ADDRESS_PROOF = 'ADDRESS_PROOF',
  PROFILE_PHOTO = 'PROFILE_PHOTO',
  VEHICLE_PHOTO = 'VEHICLE_PHOTO',
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// Ride types
export enum RideStatus {
  REQUESTED = 'REQUESTED',
  OFFER_PENDING = 'OFFER_PENDING',
  DRIVER_ASSIGNED = 'DRIVER_ASSIGNED',
  DRIVER_ARRIVING = 'DRIVER_ARRIVING',
  DRIVER_ARRIVED = 'DRIVER_ARRIVED',
  TRIP_STARTED = 'TRIP_STARTED',
  TRIP_COMPLETED = 'TRIP_COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum OfferStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COUNTERED = 'COUNTERED',
  EXPIRED = 'EXPIRED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  CREATED = 'CREATED',
  AUTHORIZED = 'AUTHORIZED',
  CAPTURED = 'CAPTURED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum PaymentMethod {
  ONLINE = 'ONLINE',
  CASH = 'CASH',
  WALLET = 'WALLET',
}

export enum PoolingStatus {
  OPEN = 'OPEN',
  MATCHED = 'MATCHED',
  FULL = 'FULL',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ScheduledRideStatus {
  SCHEDULED = 'SCHEDULED',
  DRIVER_ASSIGNED = 'DRIVER_ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum NotificationType {
  RIDE_UPDATE = 'RIDE_UPDATE',
  PAYMENT = 'PAYMENT',
  OFFER = 'OFFER',
  SYSTEM = 'SYSTEM',
  PROMOTION = 'PROMOTION',
  SAFETY = 'SAFETY',
  SUPPORT = 'SUPPORT',
}

// Coordinate type
export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Fare estimate
export interface FareEstimate {
  vehicleCategory: VehicleCategory;
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surcharge: number;
  totalFare: number;
  estimatedDistance: number;
  estimatedDuration: number;
  currency: string;
}

// Location
export interface LocationResult {
  address: string;
  latitude: number;
  longitude: number;
  displayName?: string;
}

// Route
export interface RouteResult {
  distance: number; // in km
  duration: number; // in minutes
  geometry: [number, number][];
}
