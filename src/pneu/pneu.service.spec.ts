import { Test, TestingModule } from '@nestjs/testing';
import { PneuService } from './pneu.service';

describe('PneuService', () => {
  let service: PneuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PneuService],
    }).compile();

    service = module.get<PneuService>(PneuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
