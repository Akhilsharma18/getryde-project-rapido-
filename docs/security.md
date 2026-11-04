# GETRYDE Security & Compliance Checklist

## 1. Authentication & Session Security
- **Phone OTP Protection**: Rate limited to 1 request per minute per phone number; 5-minute strict TTL; brute-force locked after 5 failed attempts.
- **JWT Rotation**: 15-minute short-lived access tokens with rotating refresh tokens stored securely.
- **Role-Based Access Control (RBAC)**: Enforced via NestJS guards across Rider, Driver, and Admin routes.

## 2. API & Network Hardening
- **CORS Constraints**: Explicitly whitelisted origin headers matching production frontend domains.
- **DTO Validation**: Class-validator with `whitelist: true` and `forbidNonWhitelisted: true` preventing payload tampering and SQL injection.
- **Payment Verification**: Mandatory server-side cryptographic signature checks (`HMAC-SHA256`) before any ride is marked as paid.
- **Webhooks**: Signature verification against `RAZORPAY_WEBHOOK_SECRET` to prevent spoofed webhook events.

## 3. Data Protection & Privacy
- **Geospatial Privacy**: Rider phone numbers are never shared with drivers; communications are routed through proxy interfaces.
- **Driver Verification**: Manual admin approval required for driver KYC documents before online dispatch is unlocked.
- **Audit Logging**: Sensitive pricing modifications, driver bans, and refunds are immutably logged with admin user ID, timestamp, and IP address.
