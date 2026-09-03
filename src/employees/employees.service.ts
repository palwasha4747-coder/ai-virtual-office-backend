import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from './employee.entity/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  findAll() {
    return this.employeeRepository.find();
  }

  create(employeeData: Partial<Employee>) {
    const employee = this.employeeRepository.create(employeeData);

    return this.employeeRepository.save(employee);
  }

  async update(id: number, employeeData: Partial<Employee>) {
    await this.employeeRepository.update(id, employeeData);

    return this.employeeRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.employeeRepository.delete(id);

    return {
      message: 'Employee deleted successfully',
    };
  }
}