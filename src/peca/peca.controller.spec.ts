import { Test, TestingModule } from '@nestjs/testing';
import { PecaController } from './peca.controller';
import { PecaService } from './peca.service';

describe('PecaController', () => {
  let controller: PecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PecaController],
      providers: [PecaService],
    }).compile();

    controller = module.get<PecaController>(PecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
