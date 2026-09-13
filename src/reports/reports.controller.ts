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

import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get()
  getReports() {
    return this.reportsService.getReports();
  }

  @Get(':id')
  getReportById(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.getReportById(id);
  }

  @Post()
  createReport(@Body() dto: CreateReportDto) {
    return this.reportsService.createReport(dto);
  }

  @Patch(':id/complete')
  completeReport(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.completeReport(id);
  }

  @Delete(':id')
  deleteReport(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.deleteReport(id);
  }
}