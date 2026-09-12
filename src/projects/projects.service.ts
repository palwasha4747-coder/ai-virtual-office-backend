import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProjectEntity } from './entities/project.entity/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async getProjects(): Promise<ProjectEntity[]> {
    return this.projectRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getProjectById(
    id: number,
  ): Promise<ProjectEntity> {
    const project =
      await this.projectRepository.findOne({
        where: { id },
      });

    if (!project) {
      throw new NotFoundException(
        'Project not found',
      );
    }

    return project;
  }

  async createProject(
    name: string,
    description: string,
    status: string,
    progress: number,
    deadline: string,
    members: number,
    agent: string,
  ): Promise<ProjectEntity> {
    const project =
      this.projectRepository.create({
        name,
        description,
        status,
        progress,
        deadline,
        members,
        agent,
      });

    return this.projectRepository.save(project);
  }

  async updateProject(
    id: number,
    data: {
      name?: string;
      description?: string;
      status?: string;
      progress?: number;
      deadline?: string;
      members?: number;
      agent?: string;
    },
  ): Promise<ProjectEntity> {
    const project =
      await this.getProjectById(id);

    Object.assign(project, data);

    return this.projectRepository.save(project);
  }

  async deleteProject(id: number): Promise<void> {
    const project =
      await this.getProjectById(id);

    await this.projectRepository.remove(project);
  }
}