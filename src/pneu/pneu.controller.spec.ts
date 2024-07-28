import { Test, TestingModule } from '@nestjs/testing';
import { PneuController } from './pneu.controller';

describe('PneuController', () => {
  let controller: PneuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PneuController],
    }).compile();

    controller = module.get<PneuController>(PneuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
