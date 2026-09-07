import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductivityService {
  getGrowthPoints() {
    return {
      percentage: 82,
      title: 'Productivity this week',
      message: "You're performing better than last week.",
    };
  }
}