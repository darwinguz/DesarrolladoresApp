import { Test, TestingModule } from '@nestjs/testing';
import { TecnologiaController } from './tecnologia.controller';
import { TecnologiaService } from './tecnologia.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TecnologiaEntity } from './tecnologia.entity';
import { CrearTecnologiaDto } from './dtos/crear-tecnologia.dto';

describe('Tecnologia Controller', () => {
  let tecnologiaController: TecnologiaController;
  let tecnologiaService: TecnologiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecnologiaController],
      providers: [
        TecnologiaService,
        {
          provide: getRepositoryToken(TecnologiaEntity),
          useValue: null,
        },
      ],
    }).compile();

    tecnologiaController = module.get<TecnologiaController>(TecnologiaController);
    tecnologiaService = module.get<TecnologiaService>(TecnologiaService);
  });

  describe('postInsertar', () => {
    it('debe insertar', async () => {
      const crearTecnologiaDto: CrearTecnologiaDto = {
        nombre: 'JavaScript',
      };
      jest.spyOn(tecnologiaService, 'insertar')
        .mockImplementation((): Promise<TecnologiaEntity> => Promise.resolve({
          id: 1,
          nombre: crearTecnologiaDto.nombre,
        }));
      const tecnologiaEntity = await tecnologiaController.postInsertar(crearTecnologiaDto);
      expect(tecnologiaEntity).toBeDefined();
    });
  });

  describe('getSeleccionarTodos', () => {
    it('debe seleccionar todos', async () => {
      jest.spyOn(tecnologiaService, 'seleccionarTodos')
        .mockImplementation(() => Promise.resolve([{
          id: 1,
          nombre: 'JavaScript',
        }]));
      const tecnologiasEntities = await tecnologiaController.getSeleccionarTodos();
      expect(tecnologiasEntities).toBeDefined();
    });
  });

});
