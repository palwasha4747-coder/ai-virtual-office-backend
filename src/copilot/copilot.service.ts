import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskEntity } from '../tasks/entities/task.entity/task.entity';

@Injectable()
export class CopilotService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async processCommand(command: string) {
    const normalizedCommand = command.trim().toLowerCase();

    if (!normalizedCommand) {
      return {
        success: false,
        type: 'error',
        message: 'Please enter a command.',
      };
    }

    // TASKS
    if (
      normalizedCommand.includes('task') ||
      normalizedCommand.includes('todo')
    ) {
      const tasks = await this.taskRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

      if (tasks.length === 0) {
        return {
          success: true,
          type: 'task',
          message: 'You currently have no tasks.',
        };
      }

      if (
        normalizedCommand.includes('pending') ||
        normalizedCommand.includes('waiting')
      ) {
        const pendingTasks = tasks.filter(
          (task) => task.status === 'Pending',
        );

        if (pendingTasks.length === 0) {
          return {
            success: true,
            type: 'task',
            message: 'You currently have no pending tasks.',
          };
        }

        const taskList = pendingTasks
          .map(
            (task) =>
              `${task.title} (${task.priority} priority, assigned to ${task.assignedTo})`,
          )
          .join('; ');

        return {
          success: true,
          type: 'task',
          message: `You have ${pendingTasks.length} pending task(s): ${taskList}.`,
        };
      }

      if (
        normalizedCommand.includes('completed') ||
        normalizedCommand.includes('complete')
      ) {
        const completedTasks = tasks.filter(
          (task) => task.status === 'Completed',
        );

        return {
          success: true,
          type: 'task',
          message: `You currently have ${completedTasks.length} completed task(s).`,
        };
      }

      const activeTasks = tasks.filter(
        (task) =>
          task.status === 'In Progress' ||
          task.status === 'Pending',
      );

      return {
        success: true,
        type: 'task',
        message: `You currently have ${tasks.length} total task(s), with ${activeTasks.length} active and ${tasks.length - activeTasks.length} completed.`,
      };
    }

    // SCHEDULE
    if (
      normalizedCommand.includes('schedule') ||
      normalizedCommand.includes('meeting') ||
      normalizedCommand.includes('calendar')
    ) {
      return {
        success: true,
        type: 'calendar',
        message:
          'I can help you schedule and manage your workspace calendar.',
      };
    }

    // PROJECTS
    if (
      normalizedCommand.includes('project') ||
      normalizedCommand.includes('projects')
    ) {
      return {
        success: true,
        type: 'project',
        message:
          'I can help you review and manage your projects.',
      };
    }

    // DOCUMENTS / REPORTS
    if (
      normalizedCommand.includes('document') ||
      normalizedCommand.includes('report')
    ) {
      return {
        success: true,
        type: 'document',
        message:
          'I can help you create, review, and manage workspace documents and reports.',
      };
    }

    // GREETING
    if (
      normalizedCommand === 'hi' ||
      normalizedCommand === 'hello' ||
      normalizedCommand === 'hey'
    ) {
      return {
        success: true,
        type: 'general',
        message:
          'Hello Palwasha! I am your AI Co-Pilot. I can now read your real workspace tasks and help you manage them.',
      };
    }

    // DEFAULT
    return {
      success: true,
      type: 'general',
      message: `I received your command: "${command}". Try asking about your tasks, pending tasks, completed tasks, projects, documents, or schedule.`,
    };
  }
}