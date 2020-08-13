import { Test, TestingModule } from '@nestjs/testing';
import { DesarrolladorService } from './desarrollador.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DesarrolladorEntity } from './desarrollador.entity';
import { TecnologiaService } from '../tecnologia/tecnologia.service';
import { TecnologiaEntity } from '../tecnologia/tecnologia.entity';
import { CrearDesarrolladorDto } from './dtos/crear-desarrollador.dto';
import { DeleteResult, Repository } from 'typeorm/index';
import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ActualizarDesarrolladorDto } from './dtos/actualizar-desarrollador.dto';

describe('DesarrolladorService', () => {
  let desarrolladorService: DesarrolladorService;
  let desarrolladorRepository: Repository<DesarrolladorEntity>;
  let tecnologiaService: TecnologiaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DesarrolladorService,
        {
          provide: getRepositoryToken(DesarrolladorEntity),
          useClass: Repository,
        },
        TecnologiaService,
        {
          provide: getRepositoryToken(TecnologiaEntity),
          useValue: null,
        },
      ],
    }).compile();

    desarrolladorService = module.get<DesarrolladorService>(DesarrolladorService);
    tecnologiaService = module.get<TecnologiaService>(TecnologiaService);
    desarrolladorRepository = module.get<Repository<DesarrolladorEntity>>(getRepositoryToken(DesarrolladorEntity));
  });

  describe('insertar', () => {
    it('debe ser insertado', async () => {
      const crearDesarrolladorDto: CrearDesarrolladorDto = {
        nombresCompletos: 'Darwin Guzmán',
        linkGitHub: 'https://github.com/darwinguz',
        idsTecnologiasConocidas: [1],
      };
      const tecnologiaEntities: TecnologiaEntity[] = [{ id: 1, nombre: 'JavaScript' }];
      jest.spyOn(tecnologiaService, 'seleccionarTodosPorIds')
        .mockImplementation(() => Promise.resolve(tecnologiaEntities));
      jest.spyOn(desarrolladorRepository, 'save')
        .mockImplementation((desarrolladorEntity: DesarrolladorEntity): Promise<DesarrolladorEntity> => {
          desarrolladorEntity.id = 1;
          return Promise.resolve(desarrolladorEntity);
        });
      const desarrolladorEntity = await desarrolladorService.insertar(crearDesarrolladorDto);
      const desarrolladorEsperadoEntity: DesarrolladorEntity = new DesarrolladorEntity();
      desarrolladorEsperadoEntity.id = 1;
      desarrolladorEsperadoEntity.nombresCompletos = crearDesarrolladorDto.nombresCompletos;
      desarrolladorEsperadoEntity.linkGitHub = crearDesarrolladorDto.linkGitHub;
      desarrolladorEsperadoEntity.tecnologiasConocidas = tecnologiaEntities;

      expect(desarrolladorEntity).toBeInstanceOf(DesarrolladorEntity);
      expect(desarrolladorEntity).toMatchObject(desarrolladorEsperadoEntity);
      expect(desarrolladorEntity).toHaveProperty('id', 1);
    });

    it('debe lanzar una excepción', async () => {
      const crearDesarrolladorDto: CrearDesarrolladorDto = {
        nombresCompletos: 'Darwin Guzmán',
        linkGitHub: 'https://github.com/darwinguz',
        idsTecnologiasConocidas: [1],
      };
      const tecnologiaEntities: TecnologiaEntity[] = [{ id: 1, nombre: 'JavaScript' }];
      jest.spyOn(tecnologiaService, 'seleccionarTodosPorIds')
        .mockImplementation(() => Promise.resolve(tecnologiaEntities));
      jest.spyOn(desarrolladorRepository, 'save')
        .mockImplementation((desarrolladorEntity: DesarrolladorEntity): Promise<DesarrolladorEntity> => {
          return Promise.resolve(desarrolladorEntity);
        });
      await expect(desarrolladorService.insertar(crearDesarrolladorDto)).rejects.toThrow(ServiceUnavailableException);
    });
  });

  describe('seleccionarTodos', () => {
    it('debe seleccionar todos ', async () => {
      const desarrolladoresEsperadosEntities: DesarrolladorEntity[] = [
        {
          id: 1,
          nombresCompletos: 'Darwin Guzmán',
          linkGitHub: 'https://github.com/darwinguz',
          tecnologiasConocidas: null,
        },
        {
          id: 1,
          nombresCompletos: 'Darwin Guzmán',
          linkGitHub: 'https://github.com/darwinguz',
          tecnologiasConocidas: null,
        },
      ];
      jest.spyOn(desarrolladorRepository, 'find')
        .mockImplementation((): Promise<DesarrolladorEntity[]> => {
          return Promise.resolve(desarrolladoresEsperadosEntities);
        });

      const desarrolladoresEntities = await desarrolladorService.seleccionarTodos();
      expect(desarrolladoresEntities).toEqual(expect.arrayContaining(desarrolladoresEsperadosEntities));
      expect(desarrolladoresEntities.length).toBeGreaterThanOrEqual(0);
    });

    it('debe lanzar una excepción ', async () => {
      jest.spyOn(desarrolladorRepository, 'find')
        .mockImplementation((): Promise<DesarrolladorEntity[]> => {
          return Promise.resolve(null);
        });

      await expect(desarrolladorService.seleccionarTodos()).rejects.toThrow(ServiceUnavailableException);
    });
  });

  describe('actualizar', () => {
    it('debe actualizar', async () => {
      const idDesarrollador = 1;
      const actualizarDesarrolladorDto: ActualizarDesarrolladorDto = {
        nombresCompletos: 'Darwin Guzmán',
        linkGitHub: 'https://github.com/darwinguz',
        idsTecnologiasConocidas: [1],
      };
      jest.spyOn(desarrolladorService, 'estaRegistrado')
        .mockImplementation((): Promise<boolean> => Promise.resolve(true));

      const tecnologiaEntities: TecnologiaEntity[] = [{ id: 1, nombre: 'JavaScript' }];
      jest.spyOn(tecnologiaService, 'seleccionarTodosPorIds')
        .mockImplementation(() => Promise.resolve(tecnologiaEntities));

      jest.spyOn(desarrolladorRepository, 'save')
        .mockImplementation((desarrolladorEntity: DesarrolladorEntity): Promise<DesarrolladorEntity> => {
          const desarrolladorActualizadoEntity = new DesarrolladorEntity();
          desarrolladorActualizadoEntity.id = idDesarrollador;
          desarrolladorActualizadoEntity.nombresCompletos = desarrolladorEntity.nombresCompletos;
          desarrolladorActualizadoEntity.linkGitHub = desarrolladorEntity.linkGitHub;
          desarrolladorActualizadoEntity.tecnologiasConocidas = tecnologiaEntities;
          return Promise.resolve(desarrolladorActualizadoEntity);
        });

      const desarrolladorEsperadoEntity: DesarrolladorEntity = new DesarrolladorEntity();
      desarrolladorEsperadoEntity.id = idDesarrollador;
      desarrolladorEsperadoEntity.nombresCompletos = actualizarDesarrolladorDto.nombresCompletos;
      desarrolladorEsperadoEntity.linkGitHub = actualizarDesarrolladorDto.linkGitHub;
      desarrolladorEsperadoEntity.tecnologiasConocidas = tecnologiaEntities;

      const desarrolladorActualizadoEntity = await desarrolladorService.actualizar(idDesarrollador, actualizarDesarrolladorDto);
      expect(desarrolladorActualizadoEntity).toBeInstanceOf(DesarrolladorEntity);
      expect(desarrolladorActualizadoEntity).toMatchObject(desarrolladorEsperadoEntity);
    });

    it('debe lanzar una exepción de no encontrado', async () => {
      const idDesarrollador = 1;
      const actualizarDesarrolladorDto: ActualizarDesarrolladorDto = {
        nombresCompletos: 'Darwin Guzmán',
        linkGitHub: 'https://github.com/darwinguz',
        idsTecnologiasConocidas: [1],
      };
      jest.spyOn(desarrolladorService, 'estaRegistrado')
        .mockImplementation((): Promise<boolean> => Promise.resolve(false));

      await expect(desarrolladorService.actualizar(idDesarrollador, actualizarDesarrolladorDto))
        .rejects.toThrow(NotFoundException);
    });

    it('debe lanzar una exepción de servicio no disponible', async () => {
      const idDesarrollador = 1;
      const actualizarDesarrolladorDto: ActualizarDesarrolladorDto = {
        nombresCompletos: 'Darwin Guzmán',
        linkGitHub: 'https://github.com/darwinguz',
        idsTecnologiasConocidas: [1],
      };
      jest.spyOn(desarrolladorService, 'estaRegistrado')
        .mockImplementation((): Promise<boolean> => Promise.resolve(true));

      const tecnologiaEntities: TecnologiaEntity[] = [{ id: 1, nombre: 'JavaScript' }];
      jest.spyOn(tecnologiaService, 'seleccionarTodosPorIds')
        .mockImplementation(() => Promise.resolve(tecnologiaEntities));

      jest.spyOn(desarrolladorRepository, 'save')
        .mockImplementation((): Promise<DesarrolladorEntity> => Promise.resolve(null));

      await expect(desarrolladorService.actualizar(idDesarrollador, actualizarDesarrolladorDto))
        .rejects.toThrow(ServiceUnavailableException);
    });
  });

  describe('estaRegistrado', () => {
    it('debe retornar true', async () => {
      jest.spyOn(desarrolladorRepository, 'findOne')
        .mockImplementation((): Promise<DesarrolladorEntity> => {
          const desarrolladorEntity: DesarrolladorEntity = new DesarrolladorEntity();
          desarrolladorEntity.id = 1;
          desarrolladorEntity.nombresCompletos = 'Darwin Guzmán';
          desarrolladorEntity.linkGitHub = 'https://github.com/darwinguz';
          desarrolladorEntity.tecnologiasConocidas = null;
          return Promise.resolve(desarrolladorEntity);
        });
      expect(await desarrolladorService.estaRegistrado(1)).toBeTruthy();
    });
  });

  describe('eliminar', () => {
    it('debe eliminar', async () => {
      const idDesarrollador = 1;
      jest.spyOn(desarrolladorService, 'estaRegistrado')
        .mockImplementation((): Promise<boolean> => Promise.resolve(true));

      jest.spyOn(desarrolladorRepository, 'delete')
        .mockImplementation((): Promise<DeleteResult> => Promise.resolve({ raw: 1, affected: 1 }));

      await expect(desarrolladorService.eliminar(idDesarrollador)).resolves.not.toThrow();
    });

    it('debe lanzar una exepción de no encontrado', async () => {
      const idDesarrollador = 1;
      jest.spyOn(desarrolladorService, 'estaRegistrado')
        .mockImplementation((): Promise<boolean> => Promise.resolve(false));

      await expect(desarrolladorService.eliminar(idDesarrollador))
        .rejects.toThrow(NotFoundException);
    });

    it('debe lanzar una exepción de servicio no disponible', async () => {
      const idDesarrollador = 1;
      jest.spyOn(desarrolladorService, 'estaRegistrado')
        .mockImplementation((): Promise<boolean> => Promise.resolve(true));

      jest.spyOn(desarrolladorRepository, 'delete')
        .mockImplementation((): Promise<DeleteResult> => Promise.resolve(null));

      await expect(desarrolladorService.eliminar(idDesarrollador))
        .rejects.toThrow(ServiceUnavailableException);
    });
  });

});
