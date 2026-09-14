import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkflowEntity } from './entities/workflow.entity';

@Injectable()
export class WorkflowsSeedService
  implements OnModuleInit
{
  constructor(
    @InjectRepository(WorkflowEntity)
    private readonly workflowRepository: Repository<WorkflowEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    const workflowCount =
      await this.workflowRepository.count();

    if (workflowCount > 0) {
      return;
    }

    const workflows = [
      {
        name: 'Daily Task Management',
        description:
          'Automatically organizes and manages daily workspace tasks.',
        status: 'Active',
        steps: 4,
        completedRuns: 128,
        successRate: 98,
        agent: 'Manager Agent',
        activity: 'Running daily task automation',
      },
      {
        name: 'Document Processing',
        description:
          'Processes uploaded documents and prepares AI summaries.',
        status: 'Active',
        steps: 3,
        completedRuns: 86,
        successRate: 97,
        agent: 'Document Agent',
        activity: 'Processing documents',
      },
      {
        name: 'Research Automation',
        description:
          'Automates research collection, analysis and summaries.',
        status: 'Active',
        steps: 5,
        completedRuns: 64,
        successRate: 95,
        agent: 'Research Agent',
        activity: 'Analyzing research data',
      },
      {
        name: 'Meeting Preparation',
        description:
          'Prepares meeting information and calendar-related tasks.',
        status: 'Paused',
        steps: 3,
        completedRuns: 42,
        successRate: 96,
        agent: 'Meeting Agent',
        activity: 'Workflow paused',
      },
      {
        name: 'Team Notifications',
        description:
          'Automates important notifications for the workspace team.',
        status: 'Active',
        steps: 2,
        completedRuns: 113,
        successRate: 99,
        agent: 'Manager Agent',
        activity: 'Monitoring team updates',
      },
    ];

    await this.workflowRepository.save(workflows);

    console.log('Workflows seeded successfully.');
  }
}