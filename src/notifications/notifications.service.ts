import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationEntity } from './entities/notification.entity/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async getNotifications(): Promise<NotificationEntity[]> {
    return this.notificationRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 20,
    });
  }

  async createNotification(
    title: string,
    message: string,
    time: string,
    unread = true,
  ): Promise<NotificationEntity> {
    const notification =
      this.notificationRepository.create({
        title,
        message,
        time,
        unread,
      });

    return this.notificationRepository.save(
      notification,
    );
  }

  async markAllAsRead(): Promise<void> {
    await this.notificationRepository.update(
      { unread: true },
      { unread: false },
    );
  }
}