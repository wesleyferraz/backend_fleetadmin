import { Test, TestingModule } from '@nestjs/testing';
import { OleoTrocaCorretivaController } from './oleo-troca-corretiva.controller';

describe('OleoTrocaCorretivaController', () => {
  let controller: OleoTrocaCorretivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OleoTrocaCorretivaController],
    }).compile();

    controller = module.get<OleoTrocaCorretivaController>(OleoTrocaCorretivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
