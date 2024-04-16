import { Test, TestingModule } from '@nestjs/testing';
import { MotoristaController } from './motorista.controller';
import { MotoristaService } from './motorista.service';

describe('MotoristaController', () => {
  let controller: MotoristaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotoristaController],
      providers: [MotoristaService],
    }).compile();

    controller = module.get<MotoristaController>(MotoristaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
