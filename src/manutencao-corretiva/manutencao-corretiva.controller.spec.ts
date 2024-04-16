import { Test, TestingModule } from '@nestjs/testing';
import { ManutencaoCorretivaController } from './manutencao-corretiva.controller';
import { ManutencaoCorretivaService } from './manutencao-corretiva.service';

describe('ManutencaoCorretivaController', () => {
  let controller: ManutencaoCorretivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManutencaoCorretivaController],
      providers: [ManutencaoCorretivaService],
    }).compile();

    controller = module.get<ManutencaoCorretivaController>(ManutencaoCorretivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
