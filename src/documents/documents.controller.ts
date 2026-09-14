import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

import { DocumentsService } from './documents.service';
import { DocumentAiService } from './document-ai.service';

import { CreateDocumentDto } from './dto/create-document.dto';
import { RenameDocumentDto } from './dto/rename-document.dto';
import { CreateFolderDto } from './dto/create-folder.dto';

const uploadDirectory = join(
  process.cwd(),
  'uploads',
  'documents',
);

if (!existsSync(uploadDirectory)) {
  mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly documentAiService: DocumentAiService,
  ) {}

  @Get()
  async getDocuments() {
    return this.documentsService.getDocuments();
  }

  @Get('folders/list')
  async getFolders() {
    return this.documentsService.getFolders();
  }

  // ==============================
  // DOCUMENT AI
  // ==============================

  @Post(':id/analyze')
  async analyzeDocument(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.documentAiService.analyzeDocument(id);
  }

  // ==============================
  // UPLOAD DOCUMENT
  // ==============================

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: uploadDirectory,
    }),
  )
  async uploadDocument(
    @UploadedFile() file: any,
  ) {
    if (!file) {
      return {
        success: false,
        message: 'No file uploaded',
      };
    }

    const extension = extname(file.originalname)
      .replace('.', '')
      .toUpperCase();

    const sizeInKb = file.size / 1024;

    let formattedSize: string;

    if (sizeInKb < 1024) {
      formattedSize =
        `${Math.max(1, Math.round(sizeInKb))} KB`;
    } else {
      formattedSize =
        `${(sizeInKb / 1024).toFixed(1)} MB`;
    }

    const document =
      await this.documentsService.createUploadedDocument({
        name: file.originalname.replace(
          /\.[^/.]+$/,
          '',
        ),
        type: extension,
        category: 'Project',
        size: formattedSize,
        filePath: file.path,
      });

    return document;
  }

  // ==============================
  // DOWNLOAD DOCUMENT
  // ==============================

  @Get(':id/download')
  async downloadDocument(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: any,
  ) {
    const document =
      await this.documentsService.getDocument(id);

    if (!document.filePath) {
      return response.status(404).json({
        success: false,
        message: 'File is not available for download',
      });
    }

    if (!existsSync(document.filePath)) {
      return response.status(404).json({
        success: false,
        message: 'Stored file was not found',
      });
    }

    return response.download(
      document.filePath,
      `${document.name}.${document.type.toLowerCase()}`,
    );
  }

  // ==============================
  // GET SINGLE DOCUMENT
  // ==============================

  @Get(':id')
  async getDocument(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.documentsService.getDocument(id);
  }

  // ==============================
  // CREATE DOCUMENT
  // ==============================

  @Post()
  async createDocument(
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    return this.documentsService.createDocument(
      createDocumentDto,
    );
  }

  // ==============================
  // RENAME DOCUMENT
  // ==============================

  @Patch(':id')
  async renameDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body() renameDocumentDto: RenameDocumentDto,
  ) {
    return this.documentsService.renameDocument(
      id,
      renameDocumentDto.name,
    );
  }

  // ==============================
  // DELETE DOCUMENT
  // ==============================

  @Delete(':id')
  async deleteDocument(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.documentsService.deleteDocument(id);

    return {
      success: true,
      message: 'Document deleted successfully',
    };
  }

  // ==============================
  // CREATE FOLDER
  // ==============================

  @Post('folders')
  async createFolder(
    @Body() createFolderDto: CreateFolderDto,
  ) {
    return this.documentsService.createFolder(
      createFolderDto.name,
    );
  }

  // ==============================
  // DELETE FOLDER
  // ==============================

  @Delete('folders/:id')
  async deleteFolder(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.documentsService.deleteFolder(id);

    return {
      success: true,
      message: 'Document folder deleted successfully',
    };
  }
}