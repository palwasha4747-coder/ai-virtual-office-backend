import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import OpenAI from 'openai';
import { readFile } from 'fs/promises';

import { PDFParse } from 'pdf-parse';

import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentAiService {
  private readonly openai: OpenAI;

  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeDocument(id: number) {
    const document = await this.documentRepository.findOne({
      where: { id },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    if (!document.filePath) {
      throw new BadRequestException(
        'This document does not have an uploaded file.',
      );
    }

    if (document.type.toUpperCase() !== 'PDF') {
      throw new BadRequestException(
        'Document AI currently supports PDF files.',
      );
    }

    try {
      // Read the uploaded PDF
      const fileBuffer = await readFile(document.filePath);

      // Create PDF parser using pdf-parse v2
      const parser = new PDFParse({
        data: fileBuffer,
      });

      // Extract text from PDF
      const pdfData = await parser.getText();

      // Free parser resources
      await parser.destroy();

      const documentText = pdfData.text?.trim();

      if (!documentText) {
        throw new BadRequestException(
          'No readable text was found in this PDF.',
        );
      }

      // Send document text to OpenAI
      const response = await this.openai.responses.create({
        model: 'gpt-5.6-luna',
        input: `
You are the Document AI Agent for a professional AI Virtual Office.

Analyze the following uploaded document.

Document name:
${document.name}

Document content:
${documentText}

Return the result in exactly this structure:

SUMMARY:
Write a concise professional summary in 2-4 sentences.

KEY POINTS:
- Point 1
- Point 2
- Point 3
- Add more only when useful.

IMPORTANT INFORMATION:
- Important information 1
- Important information 2
- Important information 3
- Add more only when useful.

Do not invent information that is not present in the document.
        `,
      });

      const aiResult = response.output_text?.trim();

      if (!aiResult) {
        throw new InternalServerErrorException(
          'AI did not return a result.',
        );
      }

      return {
        success: true,
        documentId: document.id,
        documentName: document.name,
        result: aiResult,
      };
    } catch (error: any) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      console.error('Document AI error:', error);

      throw new InternalServerErrorException(
        'Document AI analysis failed.',
      );
    }
  }
}