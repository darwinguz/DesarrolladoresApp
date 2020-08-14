import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { TecnologiaEntity } from './tecnologia.entity';
import { CrearTecnologiaDto } from './dtos/crear-tecnologia.dto';

/**
 * Proveedor inyectable para gestionar los datos junto con la lógica de negocio de las tecnologías.
 * @author Darwin Guzmán
 */
@Injectable()
export class TecnologiaService {

  constructor(
    @InjectRepository(TecnologiaEntity)
    private readonly tecnologiaRepository: Repository<TecnologiaEntity>,
  ) {
  }

  /**
   * Inserta una tecnología a la base de datos.
   * @param crearTecnologiaDto objeto de transferencia de datos para crear una tecnología.
   * @return Promise<TecnologiaEntity>
   * @throws ServiceUnavailableException si no hay conexión a la base de datos.
   */
  async insertar(crearTecnologiaDto: CrearTecnologiaDto): Promise<TecnologiaEntity> {
    const tecnologiaEntity = new TecnologiaEntity();
    tecnologiaEntity.nombre = crearTecnologiaDto.nombre;

    await this.tecnologiaRepository.save(tecnologiaEntity);
    if (tecnologiaEntity.id) {
      return tecnologiaEntity;
    }
    throw new ServiceUnavailableException('No se pudo crear la tecnología, intente más tarde.');
  }

  /**
   * Consulta todas las tecnologías registrados en la base de datos.
   * @return Promise<TecnologiaEntity[]>
   * @throws ServiceUnavailableException si no hay conexión a la base de datos.
   */
  async seleccionarTodos(): Promise<TecnologiaEntity[]> {
    const tecnologiasEntities = await this.tecnologiaRepository.find();
    if (tecnologiasEntities && tecnologiasEntities.length >= 0) {
      return tecnologiasEntities;
    }
    throw new ServiceUnavailableException('No se pudo obtener las tecnologías, intente más tarde.');
  }

  /**
   * Consulta todas las tecnologías según los identificadores solicitados.
   * @param ids lista de identificadores requeridos.
   * @return Promise<TecnologiaEntity[]>
   * @throws ServiceUnavailableException si no hay conexión a la base de datos.
   */
  async seleccionarTodosPorIds(ids: number[]): Promise<TecnologiaEntity[]> {
    const tecnologiasEntities = await this.tecnologiaRepository.findByIds(ids);
    if (tecnologiasEntities && tecnologiasEntities.length >= 0) {
      return tecnologiasEntities;
    }
    throw new ServiceUnavailableException('No se pudo obtener las tecnologías, intente más tarde.');
  }
}
