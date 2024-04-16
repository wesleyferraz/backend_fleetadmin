import { Test, TestingModule } from '@nestjs/testing';
import { ServicoManutencaoController } from './servico-manutencao.controller';
import { ServicoManutencaoService } from './servico-manutencao.service';

describe('ServicoManutencaoController', () => {
  let controller: ServicoManutencaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicoManutencaoController],
      providers: [ServicoManutencaoService],
    }).compile();

    controller = module.get<ServicoManutencaoController>(ServicoManutencaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
