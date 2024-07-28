import { Test, TestingModule } from '@nestjs/testing';
import { OleoTrocaCorretivaService } from './oleo-troca-corretiva.service';

describe('OleoTrocaCorretivaService', () => {
  let service: OleoTrocaCorretivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OleoTrocaCorretivaService],
    }).compile();

    service = module.get<OleoTrocaCorretivaService>(OleoTrocaCorretivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
