import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {
  getSchedule() {
    return [
      {
        time: '10:00 AM',
        title: 'Team Standup',
        detail: '15 members',
      },
      {
        time: '12:30 PM',
        title: 'Client Meeting',
        detail: 'ABC Project',
      },
      {
        time: '03:00 PM',
        title: 'Project Review',
        detail: 'AI Office',
      },
    ];
  }
}