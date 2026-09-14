import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AIAgentsController } from './ai-agents.controller';
import { AIAgentsService } from './ai-agents.service';
import { AIAgentEntity } from './entities/ai-agent.entity';
import { AIAgentsSeedService } from './ai-agents-seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AIAgentEntity,
    ]),
  ],

  controllers: [
    AIAgentsController,
  ],

  providers: [
    AIAgentsService,
    AIAgentsSeedService,
  ],

  exports: [
    AIAgentsService,
  ],
})
export class AIAgentsModule {}