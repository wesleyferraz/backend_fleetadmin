import { Test, TestingModule } from '@nestjs/testing';
import { ServicoRealizadoPreventivaService } from './servico-realizado-preventiva.service';

describe('ServicoRealizadoPreventivaService', () => {
  let service: ServicoRealizadoPreventivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicoRealizadoPreventivaService],
    }).compile();

    service = module.get<ServicoRealizadoPreventivaService>(ServicoRealizadoPreventivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
