export const APP_NAME = 'GETRYDE';
export const APP_TAGLINE = 'Your Ride. Your Choice. Your Way.';

export const VEHICLE_INFO = {
  BIKE: {
    label: 'Bike',
    description: 'Quick & affordable rides for one',
    icon: 'bike',
    maxPassengers: 1,
    defaultSeats: 1,
  },
  AUTO: {
    label: 'Auto',
    description: 'Comfortable rides for up to 3',
    icon: 'car-taxi-front',
    maxPassengers: 3,
    defaultSeats: 3,
  },
  CAR: {
    label: 'Car',
    description: 'Premium comfort for up to 4',
    icon: 'car',
    maxPassengers: 4,
    defaultSeats: 4,
  },
} as const;

export const OFFER_EXPIRY_SECONDS = 120;
export const MAX_COUNTER_OFFERS = 3;
export const MAX_NEGOTIATION_DEVIATION = 0.3; // 30% from suggested
export const MIN_FARE_MULTIPLIER = 0.7;
export const MAX_FARE_MULTIPLIER = 1.5;

export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 5;
export const OTP_MAX_ATTEMPTS = 5;

export const POOLING_MAX_DETOUR_PERCENT = 25;
export const POOLING_DISCOUNT_PERCENT = 30;

export const DEFAULT_PLATFORM_COMMISSION = 20; // 20%
