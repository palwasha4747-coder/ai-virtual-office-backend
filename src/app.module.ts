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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}