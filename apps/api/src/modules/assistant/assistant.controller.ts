import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AssistantService } from "./assistant.service";

@ApiTags("AI Ride Assistant")
@Controller("assistant")
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post("chat")
  @ApiOperation({ summary: "Chat with AI Ride Assistant connected to real backend tools" })
  async chat(@Body("query") query: string) {
    return this.assistantService.processQuery(query || "", "user-demo");
  }
}
