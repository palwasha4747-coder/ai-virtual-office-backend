import { Controller, Get } from '@nestjs/common';

import { ProductivityService } from './productivity.service';

@Controller('productivity')
export class ProductivityController {
  constructor(
    private readonly productivityService: ProductivityService,
  ) {}

  @Get('growth')
  getGrowthPoints() {
    return this.productivityService.getGrowthPoints();
  }
}