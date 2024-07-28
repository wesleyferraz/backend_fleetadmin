import { Test, TestingModule } from '@nestjs/testing';
import { PostoService } from './posto.service';

describe('PostoService', () => {
  let service: PostoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostoService],
    }).compile();

    service = module.get<PostoService>(PostoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
