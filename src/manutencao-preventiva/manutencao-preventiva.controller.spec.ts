import { Test, TestingModule } from '@nestjs/testing';
import { ManutencaoPreventivaController } from './manutencao-preventiva.controller';
import { ManutencaoPreventivaService } from './manutencao-preventiva.service';

describe('ManutencaoPreventivaController', () => {
  let controller: ManutencaoPreventivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManutencaoPreventivaController],
      providers: [ManutencaoPreventivaService],
    }).compile();

    controller = module.get<ManutencaoPreventivaController>(ManutencaoPreventivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
