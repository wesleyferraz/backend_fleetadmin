import { Test, TestingModule } from '@nestjs/testing';
import { PostoController } from './posto.controller';

describe('PostoController', () => {
  let controller: PostoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostoController],
    }).compile();

    controller = module.get<PostoController>(PostoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
