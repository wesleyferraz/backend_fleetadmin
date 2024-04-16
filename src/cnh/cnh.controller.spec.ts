import { Test, TestingModule } from '@nestjs/testing';
import { CnhController } from './cnh.controller';
import { CnhService } from './cnh.service';

describe('CnhController', () => {
  let controller: CnhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CnhController],
      providers: [CnhService],
    }).compile();

    controller = module.get<CnhController>(CnhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
