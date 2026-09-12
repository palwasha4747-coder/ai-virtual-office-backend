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

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body()
    body: {
      title: string;
      description: string;
      status: string;
      priority: string;
      assignedTo: string;
    },
  ) {
    return this.tasksService.createTask(
      body.title,
      body.description,
      body.status,
      body.priority,
      body.assignedTo,
    );
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      title?: string;
      description?: string;
      status?: string;
      priority?: string;
      assignedTo?: string;
    },
  ) {
    return this.tasksService.updateTask(id, body);
  }

  @Delete(':id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.deleteTask(id);
  }
}