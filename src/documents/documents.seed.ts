import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentEntity } from './entities/document.entity';
import { FolderEntity } from './entities/folder.entity';

@Injectable()
export class DocumentsSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,

    @InjectRepository(FolderEntity)
    private readonly folderRepository: Repository<FolderEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedFolders();
    await this.seedDocuments();
  }

  private async seedFolders(): Promise<void> {
    const folderCount = await this.folderRepository.count();

    if (folderCount > 0) {
      return;
    }

    const folders = [
      {
        name: 'Projects',
        count: 24,
      },
      {
        name: 'Business',
        count: 18,
      },
      {
        name: 'Research',
        count: 16,
      },
      {
        name: 'Reports',
        count: 12,
      },
    ];

    await this.folderRepository.save(folders);
  }

  private async seedDocuments(): Promise<void> {
    const documentCount = await this.documentRepository.count();

    if (documentCount > 0) {
      return;
    }

    const documents = [
      {
        name: 'AI Virtual Office Requirements',
        type: 'PDF',
        category: 'Project',
        size: '2.4 MB',
        agent: 'Document Agent',
      },
      {
        name: 'Project Proposal',
        type: 'DOCX',
        category: 'Business',
        size: '1.8 MB',
        agent: 'Document Agent',
      },
      {
        name: 'Market Research Report',
        type: 'PDF',
        category: 'Research',
        size: '4.2 MB',
        agent: 'Research Agent',
      },
      {
        name: 'Team Performance',
        type: 'XLSX',
        category: 'Reports',
        size: '856 KB',
        agent: 'Manager Agent',
      },
      {
        name: 'Project Presentation',
        type: 'PPTX',
        category: 'Presentation',
        size: '6.5 MB',
        agent: 'Document Agent',
      },
    ];

    await this.documentRepository.save(documents);
  }
}