import { Test, TestingModule } from '@nestjs/testing';
import { TecnologiaService } from './tecnologia.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TecnologiaEntity } from './tecnologia.entity';
import { ServiceUnavailableException } from '@nestjs/common';
import { Repository } from 'typeorm/index';
import { CrearTecnologiaDto } from './dtos/crear-tecnologia.dto';

describe('TecnologiaService', () => {
  let tecnologiaService: TecnologiaService;
  let tecnologiaRepository: Repository<TecnologiaEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TecnologiaService,
        {
          provide: getRepositoryToken(TecnologiaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    tecnologiaService = module.get<TecnologiaService>(TecnologiaService);
    tecnologiaRepository = module.get<Repository<TecnologiaEntity>>(getRepositoryToken(TecnologiaEntity));
  });

  describe('insertar', () => {
    it('debe ser insertado', async () => {
      const crearTecnologiaDto: CrearTecnologiaDto = {
        nombre: 'JavaScript',
      };
      const id = 1;
      jest.spyOn(tecnologiaRepository, 'save')
        .mockImplementation((tecnologiaEntity: TecnologiaEntity): Promise<TecnologiaEntity> => {
          tecnologiaEntity.id = id;
          return Promise.resolve(tecnologiaEntity);
        });
      const tecnologiaEntity = await tecnologiaService.insertar(crearTecnologiaDto);
      const tecnologiaEsperadaEntity = new TecnologiaEntity();
      tecnologiaEsperadaEntity.id = id;
      tecnologiaEsperadaEntity.nombre = crearTecnologiaDto.nombre;

      expect(tecnologiaEntity).toBeInstanceOf(TecnologiaEntity);
      expect(tecnologiaEntity).toEqual(tecnologiaEsperadaEntity);
      expect(tecnologiaEntity).toHaveProperty('id', id);
    });

    it('debe lanzar una excepción de sin servicio', async () => {
      const crearTecnologiaDto: CrearTecnologiaDto = {
        nombre: 'JavaScript',
      };
      jest.spyOn(tecnologiaRepository, 'save')
        .mockImplementation((): Promise<TecnologiaEntity> => {
          return Promise.resolve(undefined);
        });
      await expect(tecnologiaService.insertar(crearTecnologiaDto)).rejects.toThrow(ServiceUnavailableException);
    });
  });

  describe('seleccionarTodos', () => {
    it('debe seleccionar todos ', async () => {
      const tecnologiasEsperadasEntities: TecnologiaEntity[] = [
        {
          id: 1,
          nombre: 'JavaScript',
        },
        {
          id: 2,
          nombre: 'TypeScript',
        },
      ];
      jest.spyOn(tecnologiaRepository, 'find')
        .mockImplementation((): Promise<TecnologiaEntity[]> => {
          return Promise.resolve(tecnologiasEsperadasEntities);
        });

      const tecnologiasEntities = await tecnologiaService.seleccionarTodos();
      expect(tecnologiasEntities).toEqual(expect.arrayContaining(tecnologiasEsperadasEntities));
      expect(tecnologiasEntities.length).toBeGreaterThanOrEqual(0);
    });

    it('debe lanzar una excepción ', async () => {
      jest.spyOn(tecnologiaRepository, 'find')
        .mockImplementation((): Promise<TecnologiaEntity[]> => {
          return Promise.resolve(null);
        });

      await expect(tecnologiaService.seleccionarTodos()).rejects.toThrow(ServiceUnavailableException);
    });
  });

  describe('seleccionarTodosPorIds', () => {
    it('debe seleccionar todos ', async () => {
      const tecnologiasEsperadasEntities: TecnologiaEntity[] = [
        {
          id: 1,
          nombre: 'JavaScript',
        },
        {
          id: 2,
          nombre: 'TypeScript',
        },
      ];
      jest.spyOn(tecnologiaRepository, 'findByIds')
        .mockImplementation((): Promise<TecnologiaEntity[]> => {
          return Promise.resolve(tecnologiasEsperadasEntities);
        });

      const tecnologiasEntities = await tecnologiaService.seleccionarTodosPorIds([1, 2]);
      expect(tecnologiasEntities).toEqual(expect.arrayContaining(tecnologiasEsperadasEntities));
      expect(tecnologiasEntities.length).toBeGreaterThanOrEqual(0);
    });

    it('debe lanzar una excepción ', async () => {
      jest.spyOn(tecnologiaRepository, 'findByIds')
        .mockImplementation((): Promise<TecnologiaEntity[]> => {
          return Promise.resolve(null);
        });

      await expect(tecnologiaService.seleccionarTodosPorIds([1, 2])).rejects.toThrow(ServiceUnavailableException);
    });
  });
});
