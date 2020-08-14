import { Test, TestingModule } from '@nestjs/testing';
import { DesarrolladorController } from './desarrollador.controller';
import { DesarrolladorService } from './desarrollador.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DesarrolladorEntity } from './desarrollador.entity';
import { TecnologiaEntity } from '../tecnologia/tecnologia.entity';
import { TecnologiaService } from '../tecnologia/tecnologia.service';
import { CrearDesarrolladorDto } from './dtos/crear-desarrollador.dto';
import { ActualizarDesarrolladorDto } from './dtos/actualizar-desarrollador.dto';

describe('Desarrollador Controller', () => {
  let desarrolladorController: DesarrolladorController;
  let desarrolladorService: DesarrolladorService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesarrolladorController],
      providers: [
        DesarrolladorService,
        {
          provide: getRepositoryToken(DesarrolladorEntity),
          useValue: null,
        },
        TecnologiaService,
        {
          provide: getRepositoryToken(TecnologiaEntity),
          useValue: null,
        },
      ],
    }).compile();

    desarrolladorController = module.get<DesarrolladorController>(DesarrolladorController);
    desarrolladorService = module.get<DesarrolladorService>(DesarrolladorService);
  });

  describe('postInsertar', () => {
    it('debe insertar', async () => {
      const crearDesarrolladorDto: CrearDesarrolladorDto = {
        nombresCompletos: 'Darwin Guzmán',
        linkGitHub: 'https://github.com/darwinguz',
        idsTecnologiasConocidas: [1],
      };
      jest.spyOn(desarrolladorService, 'insertar')
        .mockImplementation(() => Promise.resolve({
          id: 1,
          nombresCompletos: 'Darwin Guzmán',
          linkGitHub: 'https://github.com/darwinguz',
        }));
      const desarrolladorEntity = await desarrolladorController.postInsertar(crearDesarrolladorDto);
      expect(desarrolladorEntity).toBeDefined();
    });
  });

  describe('getSeleccionarTodos', () => {
    it('debe seleccionar todos', async () => {
      jest.spyOn(desarrolladorService, 'seleccionarTodos')
        .mockImplementation(() => Promise.resolve([{
          id: 1,
          nombresCompletos: 'Darwin Guzmán',
          linkGitHub: 'https://github.com/darwinguz',
        }]));
      const desarrolladoresEntities = await desarrolladorController.getSeleccionarTodos();
      expect(desarrolladoresEntities).toBeDefined();
    });
  });

  describe('putActualizar', () => {
    it('debe actualizar', async () => {
      const idDesarrollador = 1;
      const actualizarDesarrolladorDto: ActualizarDesarrolladorDto = {
        nombresCompletos: 'Darwin Guzmán',
        linkGitHub: 'https://github.com/darwinguz',
        idsTecnologiasConocidas: [1],
      };
      jest.spyOn(desarrolladorService, 'actualizar')
        .mockImplementation(() => Promise.resolve({
          id: idDesarrollador,
          nombresCompletos: 'Darwin Guzmán',
          linkGitHub: 'https://github.com/darwinguz',
        }));
      const desarrolladorEntity = await desarrolladorController.putActualizar(idDesarrollador, actualizarDesarrolladorDto);
      expect(desarrolladorEntity).toBeDefined();
    });
  });

  describe('deleteEliminar', () => {
    it('debe eliminar', async () => {
      jest.spyOn(desarrolladorService, 'eliminar')
        .mockImplementation(() => Promise.resolve());
      await expect(desarrolladorController.deleteEliminar(1)).resolves.not.toThrow();
    });
  });

});
