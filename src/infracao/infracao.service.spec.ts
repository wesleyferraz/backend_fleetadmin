import { Test, TestingModule } from '@nestjs/testing';
import { InfracaoService } from './infracao.service';

describe('InfracaoService', () => {
  let service: InfracaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfracaoService],
    }).compile();

    service = module.get<InfracaoService>(InfracaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
