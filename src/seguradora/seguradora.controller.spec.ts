import { Test, TestingModule } from '@nestjs/testing';
import { SeguradoraController } from './seguradora.controller';
import { SeguradoraService } from './seguradora.service';

describe('SeguradoraController', () => {
  let controller: SeguradoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguradoraController],
      providers: [SeguradoraService],
    }).compile();

    controller = module.get<SeguradoraController>(SeguradoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
