
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

const databaseUrl = process.env.DATABASE_URL;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(databaseUrl
        ? {
            url: databaseUrl,
            ssl: { rejectUnauthorized: false },
          }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT || 5432),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'ai_virtual_office',
          }),
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
