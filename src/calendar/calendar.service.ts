import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CalendarEventEntity } from './entities/calendar-event.entity/calendar-event.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEventEntity)
    private readonly calendarRepository: Repository<CalendarEventEntity>,
  ) {}

  async getSchedule(): Promise<CalendarEventEntity[]> {
    return this.calendarRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getEventById(
    id: number,
  ): Promise<CalendarEventEntity> {
    const event = await this.calendarRepository.findOne({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(
        'Calendar event not found',
      );
    }

    return event;
  }

  async createEvent(
    time: string,
    title: string,
    detail: string,
  ): Promise<CalendarEventEntity> {
    const event = this.calendarRepository.create({
      time,
      title,
      detail,
    });

    return this.calendarRepository.save(event);
  }

  async updateEvent(
    id: number,
    data: {
      time?: string;
      title?: string;
      detail?: string;
    },
  ): Promise<CalendarEventEntity> {
    const event = await this.getEventById(id);

    Object.assign(event, data);

    return this.calendarRepository.save(event);
  }

  async deleteEvent(id: number): Promise<void> {
    const event = await this.getEventById(id);

    await this.calendarRepository.remove(event);
  }
}