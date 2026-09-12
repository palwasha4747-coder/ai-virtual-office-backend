import { Test, TestingModule } from '@nestjs/testing';
import { PcControlService } from './pc-control.service';

describe('PcControlService', () => {
  let service: PcControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PcControlService],
    }).compile();

    service = module.get<PcControlService>(PcControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
