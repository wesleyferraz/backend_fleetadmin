import { Test, TestingModule } from '@nestjs/testing';
import { PecaTrocaCorretivaController } from './peca-troca-corretiva.controller';
import { PecaTrocaCorretivaService } from './peca-troca-corretiva.service';

describe('PecaTrocaCorretivaController', () => {
  let controller: PecaTrocaCorretivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PecaTrocaCorretivaController],
      providers: [PecaTrocaCorretivaService],
    }).compile();

    controller = module.get<PecaTrocaCorretivaController>(PecaTrocaCorretivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
