import { Test, TestingModule } from '@nestjs/testing';
import { CnhService } from './cnh.service';

describe('CnhService', () => {
  let service: CnhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CnhService],
    }).compile();

    service = module.get<CnhService>(CnhService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
