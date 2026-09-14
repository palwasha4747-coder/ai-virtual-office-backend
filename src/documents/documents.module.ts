import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentAiService } from './document-ai.service';

import { DocumentEntity } from './entities/document.entity';
import { FolderEntity } from './entities/folder.entity';

import { DocumentsSeedService } from './documents.seed';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentEntity,
      FolderEntity,
    ]),
  ],

  controllers: [
    DocumentsController,
  ],

  providers: [
    DocumentsService,
    DocumentAiService,
    DocumentsSeedService,
  ],

  exports: [
    DocumentsService,
    DocumentAiService,
  ],
})
export class DocumentsModule {}