# GETRYDE Database Architecture

## 1. Relational Schema & Extensions
The database layer uses PostgreSQL with the **PostGIS** geospatial extension for high-performance coordinate calculations, corridor bounding-box matches, and geographic indexing.

## 2. Key Entities
- **User**: Core identity model supporting roles (`RIDER`, `DRIVER`, `ADMIN`, `SUPER_ADMIN`), phone credentials, and verification state.
- **RiderProfile**: Contains travel metrics, preferred vehicle categories, and rating scores.
- **DriverProfile**: Contains licensing, active availability (`ONLINE`, `OFFLINE`, `ON_TRIP`), current coordinates, and total earnings.
- **DriverDocument**: Stores KYC records (`DRIVING_LICENSE`, `VEHICLE_REGISTRATION`, `INSURANCE`, `IDENTITY_PROOF`) with admin review timestamps.
- **Vehicle**: Multi-category vehicle records (`BIKE`, `AUTO`, `CAR`) with license plate numbers and capacity.
- **Ride**: The central lifecycle transaction model linking rider, driver, pickup/drop-off coordinates, distance, fares, and status flags.
- **RideOffer & RideOfferHistory**: Enforces transparent fare negotiations with full audit trail of initial offers, counters, and response times.
- **PoolingGroup & PoolingPassenger**: Encapsulates multiple passengers sharing an active corridor with individual detour constraints and fare shares.
- **Payment & Refund**: Razorpay transaction identifiers, payment methods (UPI, Card, Cash), signatures, and refund statuses.
- **PricingRule & PlatformCommission**: Admin-configurable pricing formulas (base fare, per-km rate, per-minute rate, maximum deviation percent, and flat commission).
- **ScheduledRide**: Future ride reservations with automated reminder dispatches.
- **Notification & SupportTicket**: Communication, emergency contact notifications, and incident ticketing.
- **AuditLog**: Immutable security log recording sensitive admin actions and user modifications.
