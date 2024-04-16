import { Test, TestingModule } from '@nestjs/testing';
import { ServicoRealizadoCorretivaController } from './servico-realizado-corretiva.controller';
import { ServicoRealizadoCorretivaService } from './servico-realizado-corretiva.service';

describe('ServicoRealizadoCorretivaController', () => {
  let controller: ServicoRealizadoCorretivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicoRealizadoCorretivaController],
      providers: [ServicoRealizadoCorretivaService],
    }).compile();

    controller = module.get<ServicoRealizadoCorretivaController>(ServicoRealizadoCorretivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
