import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AIAgentEntity } from './entities/ai-agent.entity';
import { CreateAIAgentDto } from './dto/create-ai-agent.dto';
import { UpdateAIAgentDto } from './dto/update-ai-agent.dto';

@Injectable()
export class AIAgentsService {
  constructor(
    @InjectRepository(AIAgentEntity)
    private readonly agentRepository: Repository<AIAgentEntity>,
  ) {}

  async getAgents(): Promise<AIAgentEntity[]> {
    return this.agentRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getAgent(id: number): Promise<AIAgentEntity> {
    const agent = await this.agentRepository.findOne({
      where: { id },
    });

    if (!agent) {
      throw new NotFoundException('AI Agent not found');
    }

    return agent;
  }

  async createAgent(
    data: CreateAIAgentDto,
  ): Promise<AIAgentEntity> {
    const agent = this.agentRepository.create({
      name: data.name,
      role: data.role,
      description:
        data.description ||
        'AI agent ready to assist with workspace operations.',
      status: 'Idle',
      tasks: 0,
      accuracy: '100%',
      activity: 'Waiting for new requests',
    });

    return this.agentRepository.save(agent);
  }

  async updateAgent(
    id: number,
    data: UpdateAIAgentDto,
  ): Promise<AIAgentEntity> {
    const agent = await this.getAgent(id);

    if (data.name !== undefined) {
      agent.name = data.name;
    }

    if (data.role !== undefined) {
      agent.role = data.role;
    }

    if (data.description !== undefined) {
      agent.description = data.description;
    }

    return this.agentRepository.save(agent);
  }

  async deleteAgent(id: number): Promise<void> {
    const agent = await this.getAgent(id);

    await this.agentRepository.remove(agent);
  }

  async updateStatus(
    id: number,
    status: 'Active' | 'Idle',
  ): Promise<AIAgentEntity> {
    const agent = await this.getAgent(id);

    agent.status = status;

    if (status === 'Active') {
      agent.activity = 'Ready for new tasks';
    } else {
      agent.activity = 'Waiting for new requests';
    }

    return this.agentRepository.save(agent);
  }
}