import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CopilotController } from './copilot.controller';
import { CopilotService } from './copilot.service';
import { TaskEntity } from '../tasks/entities/task.entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [CopilotController],
  providers: [CopilotService],
})
export class CopilotModule {}