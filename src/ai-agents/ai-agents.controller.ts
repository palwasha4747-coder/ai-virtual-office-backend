import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AIAgentsService } from './ai-agents.service';
import { CreateAIAgentDto } from './dto/create-ai-agent.dto';
import { UpdateAIAgentDto } from './dto/update-ai-agent.dto';

@Controller('ai-agents')
export class AIAgentsController {
  constructor(
    private readonly aiAgentsService: AIAgentsService,
  ) {}

  @Get()
  async getAgents() {
    return this.aiAgentsService.getAgents();
  }

  @Get(':id')
  async getAgent(@Param('id') id: string) {
    return this.aiAgentsService.getAgent(Number(id));
  }

  @Post()
  async createAgent(@Body() data: CreateAIAgentDto) {
    return this.aiAgentsService.createAgent(data);
  }

  @Patch(':id')
  async updateAgent(
    @Param('id') id: string,
    @Body() data: UpdateAIAgentDto,
  ) {
    return this.aiAgentsService.updateAgent(
      Number(id),
      data,
    );
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'Active' | 'Idle' },
  ) {
    return this.aiAgentsService.updateStatus(
      Number(id),
      body.status,
    );
  }

  @Delete(':id')
  async deleteAgent(@Param('id') id: string) {
    await this.aiAgentsService.deleteAgent(Number(id));

    return {
      success: true,
      message: 'AI Agent deleted successfully',
    };
  }
}