import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  @Get('recent')
  getRecentActivity() {
    return this.activityService.getRecentActivity();
  }

  @Post()
  createActivity(
    @Body()
    body: {
      agent: string;
      action: string;
      time: string;
    },
  ) {
    return this.activityService.createActivity(
      body.agent,
      body.action,
      body.time,
    );
  }
}