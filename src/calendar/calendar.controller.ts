import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(
    private readonly calendarService: CalendarService,
  ) {}

  @Get('schedule')
  getSchedule() {
    return this.calendarService.getSchedule();
  }

  @Get(':id')
  getEventById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.calendarService.getEventById(id);
  }

  @Post()
  createEvent(
    @Body()
    body: {
      time: string;
      title: string;
      detail: string;
    },
  ) {
    return this.calendarService.createEvent(
      body.time,
      body.title,
      body.detail,
    );
  }

  @Patch(':id')
  updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      time?: string;
      title?: string;
      detail?: string;
    },
  ) {
    return this.calendarService.updateEvent(
      id,
      body,
    );
  }

  @Delete(':id')
  deleteEvent(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.calendarService.deleteEvent(id);
  }
}