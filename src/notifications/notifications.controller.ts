import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
} from '@nestjs/common';

import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get()
  getNotifications() {
    return this.notificationsService.getNotifications();
  }

  @Post()
  createNotification(
    @Body()
    body: {
      title: string;
      message: string;
      time: string;
      unread?: boolean;
    },
  ) {
    return this.notificationsService.createNotification(
      body.title,
      body.message,
      body.time,
      body.unread ?? true,
    );
  }

  @Patch('read-all')
  markAllAsRead() {
    return this.notificationsService.markAllAsRead();
  }
}