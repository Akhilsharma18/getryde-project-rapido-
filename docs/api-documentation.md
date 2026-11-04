# GETRYDE API Documentation

All REST endpoints are prefixed with `/api`. Swagger OpenAPI specifications are accessible live at `/api/docs`.

## 1. Authentication (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/send-otp` | Request 6-digit OTP for mobile number |
| `POST` | `/api/auth/verify-otp` | Verify OTP code & return JWT access + refresh tokens |
| `POST` | `/api/auth/register` | Register new Rider or Driver profile |
| `POST` | `/api/auth/refresh` | Rotate expired JWT access tokens |

## 2. Rides & Dispatch (`/api/rides`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/rides` | Create a new ride request with route geometry & pricing |
| `GET` | `/api/rides/:id` | Retrieve live ride coordinates, status, and driver data |
| `PATCH`| `/api/rides/:id/status`| Transition ride state according to state machine rules |
| `POST` | `/api/rides/:id/assign-driver` | Atomic driver assignment |

## 3. Smart Fare Negotiation (`/api/offers`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/offers` | Submit custom rider fare proposal |
| `POST` | `/api/offers/respond` | Driver accept, reject, or send counter-offer |

## 4. Smart Ride Pooling (`/api/pooling`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/pooling/search` | Search active corridor matches with max 10-min detour |
| `POST` | `/api/pooling/:id/join` | Join active pool and split fare |

## 5. Payments & Refunds (`/api/payments`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payments/create-order` | Create Razorpay order ID in test mode |
| `POST` | `/api/payments/verify` | Verify cryptographic payment signature |
| `POST` | `/api/payments/refund` | Trigger instant refund workflow |
| `POST` | `/api/payments/webhook` | Webhook receiver for Razorpay async updates |

## 6. AI Ride Assistant (`/api/assistant`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/assistant/chat` | Query AI assistant connected to verified backend pricing |

## 7. Socket.IO Real-time Events
- `driver:location:update`: High-frequency GPS updates
- `ride:request:new`: Broadcast new rides to nearby drivers
- `ride:offer:received`: Deliver rider offer
- `ride:offer:countered`: Deliver driver counter-offer
- `ride:driver:assigned`: Assignment event to rider
- `ride:driver:arrived`: Trigger OTP screen
- `ride:started` & `ride:completed`: Trip progression
