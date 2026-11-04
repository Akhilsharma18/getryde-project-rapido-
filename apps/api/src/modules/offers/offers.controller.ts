import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { OffersService } from "./offers.service";
import { SubmitOfferDto, RespondOfferDto } from "./dto/offers.dto";

@ApiTags("Offers & Negotiation")
@Controller("offers")
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @ApiOperation({ summary: "Propose a rider fare offer" })
  async submitOffer(@Body() dto: SubmitOfferDto) {
    return this.offersService.submitOffer(dto);
  }

  @Post("respond")
  @ApiOperation({ summary: "Accept, reject, or counter-offer a proposed fare" })
  async respond(@Body() dto: RespondOfferDto) {
    return this.offersService.respondToOffer(dto, "driver-or-rider");
  }
}
