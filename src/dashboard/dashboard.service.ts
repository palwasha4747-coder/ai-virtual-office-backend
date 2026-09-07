import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboardStats() {
    return {
      currentScore: 1820,
      activeTasks: 24,
      aiAgents: 8,
      projects: 12,
    };
  }
}