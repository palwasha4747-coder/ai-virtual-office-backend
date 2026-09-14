import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkflowEntity } from './entities/workflow.entity';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectRepository(WorkflowEntity)
    private readonly workflowRepository: Repository<WorkflowEntity>,
  ) {}

  async getWorkflows(): Promise<WorkflowEntity[]> {
    return this.workflowRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getWorkflow(id: number): Promise<WorkflowEntity> {
    const workflow = await this.workflowRepository.findOne({
      where: { id },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    return workflow;
  }

  async createWorkflow(
    data: CreateWorkflowDto,
  ): Promise<WorkflowEntity> {
    const workflow = this.workflowRepository.create({
      name: data.name,
      description:
        data.description ||
        'AI-powered workspace automation workflow.',
      agent: data.agent || 'Manager Agent',
      status: 'Active',
      steps: 3,
      completedRuns: 0,
      successRate: 100,
      activity: 'Waiting for new trigger',
    });

    return this.workflowRepository.save(workflow);
  }

  async updateWorkflow(
    id: number,
    data: UpdateWorkflowDto,
  ): Promise<WorkflowEntity> {
    const workflow = await this.getWorkflow(id);

    if (data.name !== undefined) {
      workflow.name = data.name;
    }

    if (data.description !== undefined) {
      workflow.description = data.description;
    }

    if (data.agent !== undefined) {
      workflow.agent = data.agent;
    }

    return this.workflowRepository.save(workflow);
  }

  async deleteWorkflow(id: number): Promise<void> {
    const workflow = await this.getWorkflow(id);

    await this.workflowRepository.remove(workflow);
  }

  async updateStatus(
    id: number,
    status: 'Active' | 'Paused',
  ): Promise<WorkflowEntity> {
    const workflow = await this.getWorkflow(id);

    if (status !== 'Active' && status !== 'Paused') {
      throw new BadRequestException(
        'Status must be Active or Paused',
      );
    }

    workflow.status = status;

    workflow.activity =
      status === 'Active'
        ? 'Waiting for new trigger'
        : 'Workflow paused';

    return this.workflowRepository.save(workflow);
  }

  async runWorkflow(id: number): Promise<WorkflowEntity> {
    const workflow = await this.getWorkflow(id);

    if (workflow.status !== 'Active') {
      throw new BadRequestException(
        'Workflow is paused',
      );
    }

    workflow.completedRuns += 1;
    workflow.successRate = 100;
    workflow.activity =
      'Workflow completed successfully';

    return this.workflowRepository.save(workflow);
  }
}