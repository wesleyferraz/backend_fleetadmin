import { Test, TestingModule } from '@nestjs/testing';
import { SeguroController } from './seguro.controller';
import { SeguroService } from './seguro.service';

describe('SeguroController', () => {
  let controller: SeguroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguroController],
      providers: [SeguroService],
    }).compile();

    controller = module.get<SeguroController>(SeguroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
