import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@getryde/shared";

export class SendOtpDto {
  @ApiProperty({ example: "+919876543210" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ enum: UserRole, default: UserRole.RIDER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class VerifyOtpDto {
  @ApiProperty({ example: "+919876543210" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: "123456" })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ enum: UserRole, default: UserRole.RIDER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class RegisterUserDto {
  @ApiProperty({ example: "Aarav Sharma" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "+919876543210" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: "aarav@example.com", required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: UserRole, default: UserRole.RIDER })
  @IsEnum(UserRole)
  role: UserRole;
}
