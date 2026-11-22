
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
  ) {}

  findAll(): Promise<ProjectEntity[]> {
    return this.projectsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
