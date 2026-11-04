import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { VehicleCategory, RideStatus } from "@getryde/shared";

export class CreateRideDto {
  @ApiProperty({ example: "Indiranagar 100 Feet Rd, Bengaluru" })
  @IsString()
  @IsNotEmpty()
  pickupAddress: string;

  @ApiProperty({ example: 12.9719 })
  @IsNumber()
  pickupLatitude: number;

  @ApiProperty({ example: 77.6412 })
  @IsNumber()
  pickupLongitude: number;

  @ApiProperty({ example: "Koramangala Sony World, Bengaluru" })
  @IsString()
  @IsNotEmpty()
  dropoffAddress: string;

  @ApiProperty({ example: 12.9352 })
  @IsNumber()
  dropoffLatitude: number;

  @ApiProperty({ example: 77.6245 })
  @IsNumber()
  dropoffLongitude: number;

  @ApiProperty({ enum: VehicleCategory, default: VehicleCategory.AUTO })
  @IsEnum(VehicleCategory)
  vehicleCategory: VehicleCategory;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isPooling?: boolean;

  @ApiProperty({ example: 120, required: false })
  @IsNumber()
  @IsOptional()
  proposedFare?: number;
}

export class UpdateRideStatusDto {
  @ApiProperty({ enum: RideStatus })
  @IsEnum(RideStatus)
  status: RideStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  cancellationReason?: string;
}
