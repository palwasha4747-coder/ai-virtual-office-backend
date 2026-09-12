import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EmployeesModule } from './employees/employees.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CalendarModule } from './calendar/calendar.module';
import { ProductivityModule } from './productivity/productivity.module';
import { GoalsModule } from './goals/goals.module';
import { ActivityModule } from './activity/activity.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CopilotModule } from './copilot/copilot.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AIAssistantModule } from './ai-assistant/ai-assistant.module';
import { PcControlModule } from './pc-control/pc-control.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bcsf23e05',
      database: 'ai_virtual_office',
      autoLoadEntities: true,
      synchronize: true,
    }),

    EmployeesModule,
    DashboardModule,
    CalendarModule,
    ProductivityModule,
    GoalsModule,
    ActivityModule,
    NotificationsModule,
    CopilotModule,
    TasksModule,
    ProjectsModule,
    AIAssistantModule,
    PcControlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}