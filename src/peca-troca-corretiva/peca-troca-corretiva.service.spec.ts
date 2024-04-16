import { Test, TestingModule } from '@nestjs/testing';
import { PecaTrocaCorretivaService } from './peca-troca-corretiva.service';

describe('PecaTrocaCorretivaService', () => {
  let service: PecaTrocaCorretivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PecaTrocaCorretivaService],
    }).compile();

    service = module.get<PecaTrocaCorretivaService>(PecaTrocaCorretivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
