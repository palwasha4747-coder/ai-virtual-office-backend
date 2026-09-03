import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Post()
  create(@Body() employeeData: any) {
    return this.employeesService.create(employeeData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() employeeData: any,
  ) {
    return this.employeesService.update(Number(id), employeeData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(Number(id));
  }
}