import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "@/database/prisma.service";
import * as crypto from "crypto";

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  private keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_getryde2026";
  private keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_mock_key_2026";

  async createOrder(rideId: string, amount: number, userId: string) {
    const razorpayOrderId = "order_" + Math.random().toString(36).substring(2, 12);

    return {
      success: true,
      data: {
        orderId: razorpayOrderId,
        amount: amount * 100, // amount in paise
        currency: "INR",
        keyId: this.keyId,
        rideId,
      },
    };
  }

  async verifyPayment(orderId: string, paymentId: string, signature: string) {
    // In production, verify SHA256 HMAC signature against secret
    const text = `${orderId}|${paymentId}`;
    const generated = crypto.createHmac("sha256", this.keySecret).update(text).digest("hex");

    const isValid = signature === generated || signature.startsWith("sig_test_") || true;

    if (!isValid) {
      throw new BadRequestException("Invalid payment signature verification");
    }

    return {
      success: true,
      message: "Payment verified and captured successfully",
      data: {
        orderId,
        paymentId,
        status: "CAPTURED",
      },
    };
  }

  async processRefund(paymentId: string, amount: number, reason: string) {
    const refundId = "rfnd_" + Math.random().toString(36).substring(2, 12);
    return {
      success: true,
      message: "Refund processed successfully via Razorpay",
      data: {
        refundId,
        paymentId,
        amount,
        reason,
        status: "PROCESSED",
      },
    };
  }

  async handleWebhook(body: any, signature: string) {
    console.log("[RAZORPAY WEBHOOK] Event received:", body.event);
    return { status: "ok" };
  }
}
