// Shared validation schemas (can be used in both frontend and backend)
export const phoneRegex = /^\+?[1-9]\d{9,14}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const VALIDATION = {
  phone: {
    min: 10,
    max: 15,
    pattern: phoneRegex,
    message: 'Please enter a valid phone number',
  },
  name: {
    min: 2,
    max: 100,
    message: 'Name must be between 2 and 100 characters',
  },
  otp: {
    length: 6,
    message: 'OTP must be 6 digits',
  },
  offer: {
    minDeviation: -30,
    maxDeviation: 50,
    message: 'Offer must be within allowed range',
  },
  rating: {
    min: 1,
    max: 5,
    message: 'Rating must be between 1 and 5',
  },
} as const;
