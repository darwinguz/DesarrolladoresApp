import { Test, TestingModule } from '@nestjs/testing';
import { DesarrolladorService } from './desarrollador.service';

describe('DesarrolladorService', () => {
  let service: DesarrolladorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesarrolladorService],
    }).compile();

    service = module.get<DesarrolladorService>(DesarrolladorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
