import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SendOtpDto, VerifyOtpDto, RegisterUserDto } from "./dto/auth.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("send-otp")
  @ApiOperation({ summary: "Send OTP to mobile number" })
  async sendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtp(dto);
  }

  @Post("verify-otp")
  @ApiOperation({ summary: "Verify OTP and obtain JWT tokens" })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Post("register")
  @ApiOperation({ summary: "Register new user account (Rider or Driver)" })
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh expired access token" })
  async refreshTokens(@Body("refreshToken") token: string) {
    return this.authService.refreshTokens(token);
  }
}
