import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AIAgentEntity } from './entities/ai-agent.entity';

@Injectable()
export class AIAgentsSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(AIAgentEntity)
    private readonly agentRepository: Repository<AIAgentEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    const agentCount = await this.agentRepository.count();

    if (agentCount > 0) {
      return;
    }

    const agents = [
      {
        name: 'Manager Agent',
        role: 'Workspace Manager',
        description:
          'Manages projects, tasks, team and workflows across the workspace.',
        status: 'Active',
        tasks: 12,
        accuracy: '96%',
        activity: 'Managing 8 active workflows',
      },
      {
        name: 'Research Agent',
        role: 'Research Specialist',
        description:
          'Researches topics, analyzes information and creates summaries.',
        status: 'Active',
        tasks: 6,
        accuracy: '94%',
        activity: 'Analyzing market research',
      },
      {
        name: 'Document Agent',
        role: 'Document Specialist',
        description:
          'Processes documents, creates summaries and extracts important information.',
        status: 'Active',
        tasks: 9,
        accuracy: '98%',
        activity: 'Processing 4 documents',
      },
      {
        name: 'Workflow Agent',
        role: 'Automation Specialist',
        description:
          'Automates repetitive tasks and manages workspace workflows.',
        status: 'Active',
        tasks: 15,
        accuracy: '95%',
        activity: 'Running 5 automations',
      },
      {
        name: 'Meeting Agent',
        role: 'Scheduling Assistant',
        description:
          'Manages meetings, schedules and calendar-related tasks.',
        status: 'Idle',
        tasks: 3,
        accuracy: '97%',
        activity: 'Waiting for new requests',
      },
      {
        name: 'Analytics Agent',
        role: 'Data Analyst',
        description:
          'Analyzes workspace data and generates useful reports.',
        status: 'Idle',
        tasks: 4,
        accuracy: '93%',
        activity: 'Waiting for analysis',
      },
    ];

    await this.agentRepository.save(agents);

    console.log('AI Agents seeded successfully.');
  }
}