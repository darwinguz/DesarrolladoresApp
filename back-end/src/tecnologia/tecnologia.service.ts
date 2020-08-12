import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm/index';
import { TecnologiaEntity } from './tecnologia.entity';

/**
 * Proveedor inyectable para gestionar los datos junto con la lógica de negocio de las tecnologías.
 * @author Darwin Guzmán
 */
@Injectable()
export class TecnologiaService {

  constructor(
    @InjectRepository(TecnologiaEntity)
    private readonly tecnologiaEntityRepository: Repository<TecnologiaEntity>,
  ) {
  }

  /**
   * Consulta todas las tecnologías registrados en la base de datos.
   * @return Promise<TecnologiaEntity[]>
   * @throws ServiceUnavailableException si no hay conexión a la base de datos.
   */
  async seleccionarTodos(): Promise<TecnologiaEntity[]> {
    const tecnologiasEntities = await this.tecnologiaEntityRepository.find();
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
    const tecnologiasEntities = await this.tecnologiaEntityRepository.find({
      id: In(ids),
    });
    if (tecnologiasEntities && tecnologiasEntities.length >= 0) {
      return tecnologiasEntities;
    }
    throw new ServiceUnavailableException('No se pudo obtener las tecnologías, intente más tarde.');
  }
}
