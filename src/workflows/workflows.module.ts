import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkflowsController } from './workflows.controller';
import { WorkflowsService } from './workflows.service';
import { WorkflowEntity } from './entities/workflow.entity';
import { WorkflowsSeedService } from './workflows-seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkflowEntity,
    ]),
  ],
  controllers: [
    WorkflowsController,
  ],
  providers: [
    WorkflowsService,
    WorkflowsSeedService,
  ],
  exports: [
    WorkflowsService,
  ],
})
export class WorkflowsModule {}