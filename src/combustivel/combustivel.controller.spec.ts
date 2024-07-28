import { Test, TestingModule } from '@nestjs/testing';
import { CombustivelController } from './combustivel.controller';

describe('CombustivelController', () => {
  let controller: CombustivelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombustivelController],
    }).compile();

    controller = module.get<CombustivelController>(CombustivelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
