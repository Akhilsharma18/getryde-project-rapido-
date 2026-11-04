import { Controller, Post, Body, Headers } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("create-order")
  @ApiOperation({ summary: "Create Razorpay payment order for ride" })
  async createOrder(
    @Body("rideId") rideId: string,
    @Body("amount") amount: number
  ) {
    return this.paymentsService.createOrder(rideId, amount, "rider-demo");
  }

  @Post("verify")
  @ApiOperation({ summary: "Verify Razorpay payment signature and capture payment" })
  async verifyPayment(
    @Body("orderId") orderId: string,
    @Body("paymentId") paymentId: string,
    @Body("signature") signature: string
  ) {
    return this.paymentsService.verifyPayment(orderId, paymentId, signature);
  }

  @Post("refund")
  @ApiOperation({ summary: "Trigger refund for cancelled or disputed ride" })
  async refund(
    @Body("paymentId") paymentId: string,
    @Body("amount") amount: number,
    @Body("reason") reason: string
  ) {
    return this.paymentsService.processRefund(paymentId, amount, reason);
  }

  @Post("webhook")
  @ApiOperation({ summary: "Razorpay webhook endpoint for async payment events" })
  async webhook(
    @Body() body: any,
    @Headers("x-razorpay-signature") signature: string
  ) {
    return this.paymentsService.handleWebhook(body, signature);
  }
}
