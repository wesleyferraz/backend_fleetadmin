import { Test, TestingModule } from '@nestjs/testing';
import { PecaTrocaPreventivaService } from './peca-troca-preventiva.service';

describe('PecaTrocaPreventivaService', () => {
  let service: PecaTrocaPreventivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PecaTrocaPreventivaService],
    }).compile();

    service = module.get<PecaTrocaPreventivaService>(PecaTrocaPreventivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
