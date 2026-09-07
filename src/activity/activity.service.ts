import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityEntity } from './entities/activity.entity/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) {}

  async getRecentActivity(): Promise<ActivityEntity[]> {
    return this.activityRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });
  }

  async createActivity(
    agent: string,
    action: string,
    time: string,
  ): Promise<ActivityEntity> {
    const activity = this.activityRepository.create({
      agent,
      action,
      time,
    });

    return this.activityRepository.save(activity);
  }
}