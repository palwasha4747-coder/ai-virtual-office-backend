import { Test, TestingModule } from '@nestjs/testing';
import { PcControlController } from './pc-control.controller';

describe('PcControlController', () => {
  let controller: PcControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PcControlController],
    }).compile();

    controller = module.get<PcControlController>(PcControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
