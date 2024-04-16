import { Test, TestingModule } from '@nestjs/testing';
import { ManutencaoPreventivaService } from './manutencao-preventiva.service';

describe('ManutencaoPreventivaService', () => {
  let service: ManutencaoPreventivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManutencaoPreventivaService],
    }).compile();

    service = module.get<ManutencaoPreventivaService>(ManutencaoPreventivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
