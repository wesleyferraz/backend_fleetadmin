import { Test, TestingModule } from '@nestjs/testing';
import { SeguroService } from './seguro.service';

describe('SeguroService', () => {
  let service: SeguroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguroService],
    }).compile();

    service = module.get<SeguroService>(SeguroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
