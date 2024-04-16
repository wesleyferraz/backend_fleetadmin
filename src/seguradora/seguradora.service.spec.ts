import { Test, TestingModule } from '@nestjs/testing';
import { SeguradoraService } from './seguradora.service';

describe('SeguradoraService', () => {
  let service: SeguradoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguradoraService],
    }).compile();

    service = module.get<SeguradoraService>(SeguradoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
