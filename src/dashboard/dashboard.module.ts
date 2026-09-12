import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardStatsEntity } from './entities/dashboard-stats.entity/dashboard-stats.entity';
import { TaskEntity } from '../tasks/entities/task.entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DashboardStatsEntity,
      TaskEntity,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}