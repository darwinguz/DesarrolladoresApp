import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { Repository } from 'typeorm/index';
import { InjectRepository } from '@nestjs/typeorm';
import { DesarrolladorEntity } from './desarrollador.entity';
import { ActualizarDesarrolladorDto } from './dtos/actualizar-desarrollador.dto';
import { CrearDesarrolladorDto } from './dtos/crear-desarrollador.dto';
import { TecnologiaService } from '../tecnologia/tecnologia.service';

/**
 * Proveedor inyectable para gestionar los datos junto con la lógica de negocio de los desarrolladores.
 * @author Darwin Guzmán
 */
@Injectable()
export class DesarrolladorService {

  constructor(
    @InjectRepository(DesarrolladorEntity)
    private readonly desarrolladorRepository: Repository<DesarrolladorEntity>,
    private readonly tecnologiaService: TecnologiaService,
  ) {
  }

  /**
   * Inserta un desarrollador a la base de datos.
   * @param crearDesarrolladorDto objeto de transferencia de datos para crear un desarrollador.
   * @return Promise<DesarrolladorEntity>
   * @throws ServiceUnavailableException si no hay conexión a la base de datos.
   */
  async insertar(crearDesarrolladorDto: CrearDesarrolladorDto): Promise<DesarrolladorEntity> {
    const tecnologiasConocidas = await this.tecnologiaService
      .seleccionarTodosPorIds(crearDesarrolladorDto.idsTecnologiasConocidas);

    const desarrolladorEntity = new DesarrolladorEntity();
    desarrolladorEntity.nombresCompletos = crearDesarrolladorDto.nombresCompletos;
    desarrolladorEntity.linkGitHub = crearDesarrolladorDto.linkGitHub;
    desarrolladorEntity.tecnologiasConocidas = tecnologiasConocidas;

    await this.desarrolladorRepository.save(desarrolladorEntity);
    if (desarrolladorEntity.id) {
      return desarrolladorEntity;
    }
    throw new ServiceUnavailableException('No se pudo crear el desarrollador, intente más tarde.');
  }

  /**
   * Consulta todos los desarrolladores registrados en la base de datos.
   * @return Promise<DesarrolladorEntity[]>
   * @throws ServiceUnavailableException si no hay conexión a la base de datos.
   */
  async seleccionarTodos(): Promise<DesarrolladorEntity[]> {
    const desarrolladoresEntities = await this.desarrolladorRepository.find();
    if (desarrolladoresEntities && desarrolladoresEntities.length >= 0) {
      return desarrolladoresEntities;
    }
    throw new ServiceUnavailableException('No se pudo obtener los desarrolladores, intente más tarde.');
  }

  /**
   * Actualiza los datos de un desarrollador por su identificador.
   * @param id identificador único del desarrollador.
   * @param actualizarDesarrolladorDto objeto de transferencia de datos para actualizar un desarrollador.
   * @return Promise<DesarrolladorEntity>
   * @throws NotFoundException si no hay un desarrollador con el identificador recibido.
   * @throws ServiceUnavailableException si no hay conexión a la base de datos.
   */
  async actualizar(id: number, actualizarDesarrolladorDto: ActualizarDesarrolladorDto): Promise<DesarrolladorEntity> {
    const estaRegistrado = await this.estaRegistrado(id);
    if (!estaRegistrado) {
      throw new NotFoundException(`El desarrollador con identificador ${id} no se encuentra registrado.`);
    }

    const tecnologiasConocidas = await this.tecnologiaService
      .seleccionarTodosPorIds(actualizarDesarrolladorDto.idsTecnologiasConocidas);
    const { nombresCompletos, linkGitHub } = { ...actualizarDesarrolladorDto };

    const desarrolladorEntity = await this.desarrolladorRepository.save(
      { id, nombresCompletos, linkGitHub, tecnologiasConocidas },
    );
    if (desarrolladorEntity) {
      return desarrolladorEntity;
    }
    throw new ServiceUnavailableException('No se pudo actualizar el desarrollador, intente más tarde.');
  }

  /**
   * Verifica si un desarrollador se encuentra registrado en la base de datos.
   * @param id identificador único del desarrollador.
   * @return Promise<boolean>
   */
  async estaRegistrado(id: number): Promise<boolean> {
    const desarrolladorEntity = await this.desarrolladorRepository.findOne({
      select: ['id'],
      where: { id },
    });
    return !!(desarrolladorEntity && desarrolladorEntity.id);
  }

  /**
   * Elimina un desarrollador según su identificador.
   * @param id identificador único del desarrollador.
   * @return Promise<void>
   * @throws NotFoundException si no hay un desarrollador con el identificador recibido.
   * @throws ServiceUnavailableException si no hay conexión a la base de datos.
   */
  async eliminar(id: number): Promise<void> {
    const estaRegistrado = await this.estaRegistrado(id);
    if (!estaRegistrado) {
      throw new NotFoundException(`El desarrollador con identificador ${id} no se encuentra registrado.`);
    }
    const deleteResult = await this.desarrolladorRepository.delete(id);
    if (deleteResult && deleteResult.raw) {
      return;
    }
    throw new ServiceUnavailableException('No se pudo eliminar el desarrollador, intente más tarde.');
  }
}
