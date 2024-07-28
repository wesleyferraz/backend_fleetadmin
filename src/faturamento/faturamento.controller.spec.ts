import { Test, TestingModule } from '@nestjs/testing';
import { FaturamentoController } from './faturamento.controller';

describe('FaturamentoController', () => {
  let controller: FaturamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaturamentoController],
    }).compile();

    controller = module.get<FaturamentoController>(FaturamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
