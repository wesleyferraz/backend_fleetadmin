import { Test, TestingModule } from '@nestjs/testing';
import { PecaTrocaPreventivaController } from './peca-troca-preventiva.controller';
import { PecaTrocaPreventivaService } from './peca-troca-preventiva.service';

describe('PecaTrocaPreventivaController', () => {
  let controller: PecaTrocaPreventivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PecaTrocaPreventivaController],
      providers: [PecaTrocaPreventivaService],
    }).compile();

    controller = module.get<PecaTrocaPreventivaController>(PecaTrocaPreventivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
