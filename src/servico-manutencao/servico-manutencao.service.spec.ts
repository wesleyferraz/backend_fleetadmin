import { Test, TestingModule } from '@nestjs/testing';
import { ServicoManutencaoService } from './servico-manutencao.service';

describe('ServicoManutencaoService', () => {
  let service: ServicoManutencaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicoManutencaoService],
    }).compile();

    service = module.get<ServicoManutencaoService>(ServicoManutencaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
