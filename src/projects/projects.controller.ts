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

import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  getProjectById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  createProject(
    @Body()
    body: {
      name: string;
      description: string;
      status: string;
      progress: number;
      deadline: string;
      members: number;
      agent: string;
    },
  ) {
    return this.projectsService.createProject(
      body.name,
      body.description,
      body.status,
      body.progress,
      body.deadline,
      body.members,
      body.agent,
    );
  }

  @Patch(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      name?: string;
      description?: string;
      status?: string;
      progress?: number;
      deadline?: string;
      members?: number;
      agent?: string;
    },
  ) {
    return this.projectsService.updateProject(
      id,
      body,
    );
  }

  @Delete(':id')
  deleteProject(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.deleteProject(
      id,
    );
  }
}
