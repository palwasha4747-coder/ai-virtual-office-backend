import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskEntity } from './entities/task.entity/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async createTask(
    title: string,
    description: string,
    status: string,
    priority: string,
    assignedTo: string,
  ): Promise<TaskEntity> {
    const task = this.taskRepository.create({
      title,
      description,
      status,
      priority,
      assignedTo,
    });

    return this.taskRepository.save(task);
  }

  async updateTask(
    id: number,
    data: {
      title?: string;
      description?: string;
      status?: string;
      priority?: string;
      assignedTo?: string;
    },
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id);

    Object.assign(task, data);

    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);

    await this.taskRepository.remove(task);
  }
}