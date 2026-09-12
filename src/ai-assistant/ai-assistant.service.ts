import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AIAssistantTaskEntity } from './entities/ai-assistant-task.entity/ai-assistant-task.entity';
import { AIAssistantTaskDto } from './dto/ai-assistant-task.dto/ai-assistant-task.dto';

@Injectable()
export class AIAssistantService {
  constructor(
    @InjectRepository(AIAssistantTaskEntity)
    private readonly taskRepository: Repository<AIAssistantTaskEntity>,
  ) {}

  private getAgentForCommand(command: string): string {
    const normalizedCommand = command.toLowerCase();

    if (
      normalizedCommand.includes('code') ||
      normalizedCommand.includes('developer') ||
      normalizedCommand.includes('program') ||
      normalizedCommand.includes('bug') ||
      normalizedCommand.includes('fix')
    ) {
      return 'Developer Agent';
    }

    if (
      normalizedCommand.includes('design') ||
      normalizedCommand.includes('ui') ||
      normalizedCommand.includes('ux')
    ) {
      return 'Design Agent';
    }

    if (
      normalizedCommand.includes('research') ||
      normalizedCommand.includes('market')
    ) {
      return 'Research Agent';
    }

    if (
      normalizedCommand.includes('document') ||
      normalizedCommand.includes('report') ||
      normalizedCommand.includes('file')
    ) {
      return 'Document Agent';
    }

    if (
      normalizedCommand.includes('calendar') ||
      normalizedCommand.includes('meeting') ||
      normalizedCommand.includes('schedule')
    ) {
      return 'Calendar Agent';
    }

    if (
      normalizedCommand.includes('email') ||
      normalizedCommand.includes('mail')
    ) {
      return 'Email Agent';
    }

    if (
      normalizedCommand.includes('workflow') ||
      normalizedCommand.includes('automation')
    ) {
      return 'Workflow Agent';
    }

    return 'Manager Agent';
  }

  async processCommand(dto: AIAssistantTaskDto) {
    const agent = this.getAgentForCommand(dto.task);

    const task = this.taskRepository.create({
      agent,
      task: dto.task,
      priority: dto.priority ?? 'Medium',
      status: 'In Progress',
      result: '',
    });

    const savedTask = await this.taskRepository.save(task);

    return {
      success: true,
      message: `${agent} has been assigned the task.`,
      task: savedTask,
    };
  }

  async getTasks() {
    return this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getTaskById(id: number) {
    return this.taskRepository.findOne({
      where: { id },
    });
  }

  async completeTask(id: number, result: string) {
    const task = await this.getTaskById(id);

    if (!task) {
      return {
        success: false,
        message: 'AI Assistant task not found.',
      };
    }

    task.status = 'Completed';
    task.result = result;

    const updatedTask = await this.taskRepository.save(task);

    return {
      success: true,
      message: 'AI Assistant task completed.',
      task: updatedTask,
    };
  }
}