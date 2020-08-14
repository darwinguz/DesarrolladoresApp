import { Test, TestingModule } from '@nestjs/testing';
import { TecnologiaController } from './tecnologia.controller';

describe('Tecnologia Controller', () => {
  let controller: TecnologiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecnologiaController],
    }).compile();

    controller = module.get<TecnologiaController>(TecnologiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
