import { IsString, IsNotEmpty, IsNumber, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OfferStatus } from "@getryde/shared";

export class SubmitOfferDto {
  @ApiProperty({ example: "ride-uuid" })
  @IsString()
  @IsNotEmpty()
  rideId: string;

  @ApiProperty({ example: 120 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "RIDER" })
  @IsString()
  offeredBy: string;
}

export class RespondOfferDto {
  @ApiProperty({ example: "offer-uuid" })
  @IsString()
  @IsNotEmpty()
  offerId: string;

  @ApiProperty({ enum: OfferStatus })
  @IsEnum(OfferStatus)
  action: OfferStatus;

  @ApiProperty({ example: 135, required: false })
  @IsNumber()
  counterAmount?: number;
}
