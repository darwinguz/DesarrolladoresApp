import { Test, TestingModule } from '@nestjs/testing';
import { DesarrolladorController } from './desarrollador.controller';

describe('Desarrollador Controller', () => {
  let controller: DesarrolladorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesarrolladorController],
    }).compile();

    controller = module.get<DesarrolladorController>(DesarrolladorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
