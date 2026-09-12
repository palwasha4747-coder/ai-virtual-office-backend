import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DashboardStatsEntity } from './entities/dashboard-stats.entity/dashboard-stats.entity';
import { TaskEntity } from '../tasks/entities/task.entity/task.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(DashboardStatsEntity)
    private readonly dashboardStatsRepository: Repository<DashboardStatsEntity>,

    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getDashboardStats() {
    const stats = await this.dashboardStatsRepository.findOne({
      where: { id: 1 },
    });

    if (!stats) {
      throw new NotFoundException(
        'Dashboard stats not found',
      );
    }

    const activeTasks = await this.taskRepository.count({
      where: [
        { status: 'In Progress' },
        { status: 'Pending' },
      ],
    });

    return {
      currentScore: stats.currentScore,
      activeTasks,
      aiAgents: stats.aiAgents,
      projects: stats.projects,
    };
  }
}