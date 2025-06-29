import { Test, TestingModule } from '@nestjs/testing';
import { AbastecimentoController } from './abastecimento.controller';

describe('AbastecimentoController', () => {
  let controller: AbastecimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbastecimentoController],
    }).compile();

    controller = module.get<AbastecimentoController>(AbastecimentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
