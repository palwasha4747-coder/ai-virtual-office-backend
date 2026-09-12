import { Injectable } from '@nestjs/common';

@Injectable()
export class GoalsService {
  getActiveGoals() {
    return [
      {
        title: 'Complete AI Office MVP',
        progress: 75,
      },
      {
        title: 'Client Onboarding',
        progress: 60,
      },
      {
        title: 'Improve Productivity',
        progress: 90,
      },
    ];
  }
}