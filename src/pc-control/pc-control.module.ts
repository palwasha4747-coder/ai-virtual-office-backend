import { Module } from '@nestjs/common';
import { PcControlController } from './pc-control.controller';
import { PcControlService } from './pc-control.service';

@Module({
  controllers: [PcControlController],
  providers: [PcControlService]
})
export class PcControlModule {}
