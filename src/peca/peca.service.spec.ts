import { Test, TestingModule } from '@nestjs/testing';
import { PecaService } from './peca.service';

describe('PecaService', () => {
  let service: PecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PecaService],
    }).compile();

    service = module.get<PecaService>(PecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
