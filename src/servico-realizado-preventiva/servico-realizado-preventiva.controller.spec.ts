import { Test, TestingModule } from '@nestjs/testing';
import { ServicoRealizadoPreventivaController } from './servico-realizado-preventiva.controller';
import { ServicoRealizadoPreventivaService } from './servico-realizado-preventiva.service';

describe('ServicoRealizadoPreventivaController', () => {
  let controller: ServicoRealizadoPreventivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicoRealizadoPreventivaController],
      providers: [ServicoRealizadoPreventivaService],
    }).compile();

    controller = module.get<ServicoRealizadoPreventivaController>(ServicoRealizadoPreventivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
