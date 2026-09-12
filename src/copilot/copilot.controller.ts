import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { CopilotService } from './copilot.service';

@Controller('copilot')
export class CopilotController {
  constructor(
    private readonly copilotService: CopilotService,
  ) {}

  @Post('command')
  processCommand(
    @Body()
    body: {
      command: string;
    },
  ) {
    return this.copilotService.processCommand(
      body.command,
    );
  }
}