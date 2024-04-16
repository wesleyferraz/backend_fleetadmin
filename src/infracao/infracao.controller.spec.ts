import { Test, TestingModule } from '@nestjs/testing';
import { InfracaoController } from './infracao.controller';
import { InfracaoService } from './infracao.service';

describe('InfracaoController', () => {
  let controller: InfracaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfracaoController],
      providers: [InfracaoService],
    }).compile();

    controller = module.get<InfracaoController>(InfracaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
