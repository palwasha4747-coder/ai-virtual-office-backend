import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async processCommand(
    data: AIAssistantTaskDto,
  ): Promise<{
    success: boolean;
    task: AIAssistantTaskEntity;
  }> {
    const command = data.task?.trim();

    if (!command) {
      throw new BadRequestException(
        'Task command is required',
      );
    }

    const agent = this.selectAgent(command);

    const task = this.taskRepository.create({
      agent,
      task: command,
      priority: data.priority || 'Medium',
      status: 'Working',
      result: undefined,
    });

    const savedTask =
      await this.taskRepository.save(task);

    try {
      const result =
        this.generateAgentResult(
          agent,
          command,
        );

      savedTask.status = 'Completed';
      savedTask.result = result;

      const completedTask =
        await this.taskRepository.save(
          savedTask,
        );

      return {
        success: true,
        task: completedTask,
      };
    } catch (error) {
      console.error(
        'AI Assistant processing error:',
        error,
      );

      savedTask.status = 'Failed';
      savedTask.result =
        'The AI agent could not complete this request. Please try again.';

      const failedTask =
        await this.taskRepository.save(
          savedTask,
        );

      return {
        success: false,
        task: failedTask,
      };
    }
  }

  private selectAgent(
    command: string,
  ): string {
    const lower = command.toLowerCase();

    // EMAIL FIRST
    if (
      lower.includes('email') ||
      lower.includes('mail') ||
      lower.includes('write an email') ||
      lower.includes('draft an email')
    ) {
      return 'Email Agent';
    }

    if (
      lower.includes('code') ||
      lower.includes('developer') ||
      lower.includes('program') ||
      lower.includes('website') ||
      lower.includes('app') ||
      lower.includes('bug') ||
      lower.includes('fix')
    ) {
      return 'Developer Agent';
    }

    if (
      lower.includes('design') ||
      lower.includes('ui') ||
      lower.includes('ux') ||
      lower.includes('interface') ||
      lower.includes('logo')
    ) {
      return 'Design Agent';
    }

    if (
      lower.includes('research') ||
      lower.includes('analyze') ||
      lower.includes('analysis') ||
      lower.includes('market') ||
      lower.includes('competitor')
    ) {
      return 'Research Agent';
    }

    if (
      lower.includes('document') ||
      lower.includes('pdf') ||
      lower.includes('file') ||
      lower.includes('summarize')
    ) {
      return 'Document Agent';
    }

    if (
      lower.includes('meeting') ||
      lower.includes('calendar') ||
      lower.includes('schedule') ||
      lower.includes('appointment') ||
      lower.includes('event')
    ) {
      return 'Calendar Agent';
    }

    if (
      lower.includes('workflow') ||
      lower.includes('automation') ||
      lower.includes('automate')
    ) {
      return 'Workflow Agent';
    }

    return 'Manager Agent';
  }

  private generateAgentResult(
    agent: string,
    command: string,
  ): string {
    const lower = command.toLowerCase();

    if (agent === 'Email Agent') {
      return this.generateEmailResult(command);
    }

    if (agent === 'Calendar Agent') {
      return (
        `Calendar Agent prepared a schedule-related response for your request.\n\n` +
        `Request: ${command}\n\n` +
        `Recommended action: Review the meeting details, participants, date and time before creating the calendar event.`
      );
    }

    if (agent === 'Developer Agent') {
      return (
        `Developer Agent analyzed your request.\n\n` +
        `Request: ${command}\n\n` +
        `Recommended approach: Break the requirement into smaller implementation tasks, build the required functionality, test it, and verify the final result.`
      );
    }

    if (agent === 'Design Agent') {
      return (
        `Design Agent analyzed your design request.\n\n` +
        `Request: ${command}\n\n` +
        `Recommended approach: Define the layout, visual hierarchy, spacing, typography and user interaction before implementing the final interface.`
      );
    }

    if (agent === 'Research Agent') {
      return (
        `Research Agent prepared an initial analysis.\n\n` +
        `Request: ${command}\n\n` +
        `Recommended approach: Identify the main topic, collect relevant information, compare important factors and summarize the findings clearly.`
      );
    }

    if (agent === 'Document Agent') {
      return (
        `Document Agent prepared a document-work response.\n\n` +
        `Request: ${command}\n\n` +
        `Recommended approach: Review the document content, identify the important information and produce a structured summary or analysis.`
      );
    }

    if (agent === 'Workflow Agent') {
      return (
        `Workflow Agent prepared an automation plan.\n\n` +
        `Request: ${command}\n\n` +
        `Recommended workflow: Trigger → Validate → Process → Complete → Report.`
      );
    }

    if (lower.includes('task')) {
      return (
        `Manager Agent processed your task request.\n\n` +
        `Request: ${command}\n\n` +
        `The task has been recorded successfully in the AI Assistant workspace.`
      );
    }

    return (
      `Manager Agent processed your request.\n\n` +
      `Request: ${command}\n\n` +
      `The request has been analyzed and recorded successfully.`
    );
  }

  private generateEmailResult(
    command: string,
  ): string {
    return (
      `Email Agent prepared a professional email draft.\n\n` +
      `Subject: Client Meeting\n\n` +
      `Dear Client,\n\n` +
      `I hope you are doing well. I would like to arrange a meeting with you to discuss the relevant project details and next steps. Please let me know a convenient date and time for the meeting.\n\n` +
      `I look forward to speaking with you.\n\n` +
      `Best regards,\n` +
      `AI Virtual Office\n\n` +
      `Original request: ${command}`
    );
  }

  async getTasks(): Promise<
    AIAssistantTaskEntity[]
  > {
    return this.taskRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getTaskById(
    id: number,
  ): Promise<AIAssistantTaskEntity> {
    const task =
      await this.taskRepository.findOne({
        where: {
          id,
        },
      });

    if (!task) {
      throw new NotFoundException(
        'AI Assistant task not found',
      );
    }

    return task;
  }

  async completeTask(
    id: number,
    result: string,
  ): Promise<AIAssistantTaskEntity> {
    const task =
      await this.getTaskById(id);

    task.status = 'Completed';

    if (result?.trim()) {
      task.result = result.trim();
    }

    return this.taskRepository.save(task);
  }
}