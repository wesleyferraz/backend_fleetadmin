import { Test, TestingModule } from '@nestjs/testing';
import { OleoController } from './oleo.controller';

describe('OleoController', () => {
  let controller: OleoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OleoController],
    }).compile();

    controller = module.get<OleoController>(OleoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
