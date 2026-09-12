import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AIAssistantController } from './ai-assistant.controller';
import { AIAssistantService } from './ai-assistant.service';
import { AIAssistantTaskEntity } from './entities/ai-assistant-task.entity/ai-assistant-task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AIAssistantTaskEntity]),
  ],
  controllers: [AIAssistantController],
  providers: [AIAssistantService],
})
export class AIAssistantModule {}