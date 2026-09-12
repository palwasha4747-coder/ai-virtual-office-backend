import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { AIAssistantService } from './ai-assistant.service';
import { AIAssistantTaskDto } from './dto/ai-assistant-task.dto/ai-assistant-task.dto';

@Controller('ai-assistant')
export class AIAssistantController {
  constructor(
    private readonly aiAssistantService: AIAssistantService,
  ) {}

  @Post('command')
  processCommand(@Body() dto: AIAssistantTaskDto) {
    return this.aiAssistantService.processCommand(dto);
  }

  @Get('tasks')
  getTasks() {
    return this.aiAssistantService.getTasks();
  }

  @Get('tasks/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.aiAssistantService.getTaskById(id);
  }

  @Patch('tasks/:id/complete')
  completeTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { result: string },
  ) {
    return this.aiAssistantService.completeTask(id, body.result);
  }
}