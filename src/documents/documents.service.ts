import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentEntity } from './entities/document.entity';
import { FolderEntity } from './entities/folder.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,

    @InjectRepository(FolderEntity)
    private readonly folderRepository: Repository<FolderEntity>,
  ) {}

  async getDocuments(): Promise<DocumentEntity[]> {
    return this.documentRepository.find({
      order: { id: 'DESC' },
    });
  }

  async getDocument(id: number): Promise<DocumentEntity> {
    const document = await this.documentRepository.findOne({
      where: { id },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async createDocument(data: {
    name: string;
    type: string;
    category: string;
    size: string;
    agent?: string;
  }): Promise<DocumentEntity> {
    const document = this.documentRepository.create({
      name: data.name,
      type: data.type,
      category: data.category,
      size: data.size,
      agent: data.agent || 'Document Agent',
      filePath: null,
    });

    const savedDocument =
      await this.documentRepository.save(document);

    await this.increaseFolderCount(data.category);

    return savedDocument;
  }

  async renameDocument(
    id: number,
    name: string,
  ): Promise<DocumentEntity> {
    const document = await this.getDocument(id);

    document.name = name;

    return this.documentRepository.save(document);
  }

  async deleteDocument(id: number): Promise<void> {
    const document = await this.getDocument(id);

    await this.documentRepository.remove(document);

    await this.decreaseFolderCount(document.category);
  }

  async createUploadedDocument(data: {
    name: string;
    type: string;
    category: string;
    size: string;
    filePath: string;
  }): Promise<DocumentEntity> {
    const document = this.documentRepository.create({
      name: data.name,
      type: data.type,
      category: data.category,
      size: data.size,
      agent: 'Document Agent',
      filePath: data.filePath,
    });

    const savedDocument =
      await this.documentRepository.save(document);

    await this.increaseFolderCount(data.category);

    return savedDocument;
  }

  async getFolders(): Promise<FolderEntity[]> {
    return this.folderRepository.find({
      order: { id: 'ASC' },
    });
  }

  async createFolder(name: string): Promise<FolderEntity> {
    const folder = this.folderRepository.create({
      name,
      count: 0,
    });

    return this.folderRepository.save(folder);
  }

  async deleteFolder(id: number): Promise<void> {
    const folder = await this.folderRepository.findOne({
      where: { id },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    await this.folderRepository.remove(folder);
  }

  private getFolderName(category: string): string {
    if (category === 'Project') {
      return 'Projects';
    }

    return category;
  }

  private async increaseFolderCount(
    category: string,
  ): Promise<void> {
    const folderName = this.getFolderName(category);

    const folder = await this.folderRepository.findOne({
      where: { name: folderName },
    });

    if (folder) {
      folder.count += 1;
      await this.folderRepository.save(folder);
    }
  }

  private async decreaseFolderCount(
    category: string,
  ): Promise<void> {
    const folderName = this.getFolderName(category);

    const folder = await this.folderRepository.findOne({
      where: { name: folderName },
    });

    if (folder && folder.count > 0) {
      folder.count -= 1;
      await this.folderRepository.save(folder);
    }
  }
}