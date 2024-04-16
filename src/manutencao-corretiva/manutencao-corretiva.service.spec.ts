import { Test, TestingModule } from '@nestjs/testing';
import { ManutencaoCorretivaService } from './manutencao-corretiva.service';

describe('ManutencaoCorretivaService', () => {
  let service: ManutencaoCorretivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManutencaoCorretivaService],
    }).compile();

    service = module.get<ManutencaoCorretivaService>(ManutencaoCorretivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
