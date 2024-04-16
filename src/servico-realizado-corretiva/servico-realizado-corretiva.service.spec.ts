import { Test, TestingModule } from '@nestjs/testing';
import { ServicoRealizadoCorretivaService } from './servico-realizado-corretiva.service';

describe('ServicoRealizadoCorretivaService', () => {
  let service: ServicoRealizadoCorretivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicoRealizadoCorretivaService],
    }).compile();

    service = module.get<ServicoRealizadoCorretivaService>(ServicoRealizadoCorretivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
