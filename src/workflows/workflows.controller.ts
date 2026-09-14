import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@Controller('workflows')
export class WorkflowsController {
  constructor(
    private readonly workflowsService: WorkflowsService,
  ) {}

  @Get()
  async getWorkflows() {
    return this.workflowsService.getWorkflows();
  }

  @Get(':id')
  async getWorkflow(@Param('id') id: string) {
    return this.workflowsService.getWorkflow(
      Number(id),
    );
  }

  @Post()
  async createWorkflow(
    @Body() data: CreateWorkflowDto,
  ) {
    return this.workflowsService.createWorkflow(data);
  }

  @Patch(':id')
  async updateWorkflow(
    @Param('id') id: string,
    @Body() data: UpdateWorkflowDto,
  ) {
    return this.workflowsService.updateWorkflow(
      Number(id),
      data,
    );
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'Active' | 'Paused' },
  ) {
    return this.workflowsService.updateStatus(
      Number(id),
      body.status,
    );
  }

  @Post(':id/run')
  async runWorkflow(@Param('id') id: string) {
    return this.workflowsService.runWorkflow(
      Number(id),
    );
  }

  @Delete(':id')
  async deleteWorkflow(@Param('id') id: string) {
    await this.workflowsService.deleteWorkflow(
      Number(id),
    );

    return {
      success: true,
      message: 'Workflow deleted successfully',
    };
  }
}