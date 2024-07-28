import { Test, TestingModule } from '@nestjs/testing';
import { OleoService } from './oleo.service';

describe('OleoService', () => {
  let service: OleoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OleoService],
    }).compile();

    service = module.get<OleoService>(OleoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
