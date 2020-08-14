import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DesarrolladorService } from './desarrollador.service';
import { ActualizarDesarrolladorDto } from './dtos/actualizar-desarrollador.dto';
import { DesarrolladorEntity } from './desarrollador.entity';
import { CrearDesarrolladorDto } from './dtos/crear-desarrollador.dto';

/**
 * Manejador de solicitudes y respuestas HTTP para la colección de desarrolladores.
 * @author Darwin Guzmán
 */
@Controller('developers')
export class DesarrolladorController {
  constructor(private readonly desarrolladorService: DesarrolladorService) {
  }

  /**
   * Define la ruta con el método POST para insertar desarrolladores y si no hay
   * excepciones devuelve el resultado con un código de estado exitoso CREADO.
   * @param crearDesarrolladorDto
   * @return Promise<DesarrolladorEntity>
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  postInsertar(@Body() crearDesarrolladorDto: CrearDesarrolladorDto): Promise<DesarrolladorEntity> {
    return this.desarrolladorService.insertar(crearDesarrolladorDto);
  }

  /**
   * Define la ruta con el método GET para consultar todos los desarrolladores y si no hay
   * excepciones devuelve el resultado con un código de estado exitoso APROBADO.
   * @return Promise<DesarrolladorEntity[]>
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  getSeleccionarTodos(): Promise<DesarrolladorEntity[]> {
    return this.desarrolladorService.seleccionarTodos();
  }

  /**
   * Define la ruta con el método GET para consultar un desarrollador por su identificador
   * y si no hay excepciones devuelve el resultado con un código de estado exitoso APROBADO.
   * @return Promise<DesarrolladorEntity>
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getSeleccionarPorId(@Param('id') id: number): Promise<DesarrolladorEntity> {
    return this.desarrolladorService.seleccionarPorId(id);
  }

  /**
   * Define la ruta con el método PUT para actualizar un desarrollador por su identificador Y
   * si no hay excepciones devuelve el resultado con un código de estado existoso APROBADO.
   * @param id
   * @param actualizarDesarrolladorDto
   * @return Promise<DesarrolladorEntity>
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  putActualizar(
    @Param('id') id: number, @Body() actualizarDesarrolladorDto: ActualizarDesarrolladorDto,
  ): Promise<DesarrolladorEntity> {
    return this.desarrolladorService.actualizar(id, actualizarDesarrolladorDto);
  }

  /**
   * Define la ruta con el método DELETE para eliminar un desarrollador por su identificador
   * y si no hay excepciones devuelve el resultado con un código de estado exitoso APROBADO SIN RESPUESTA.
   * @param id
   * @return Promise<void>
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteEliminar(@Param('id') id: number): Promise<void> {
    return this.desarrolladorService.eliminar(id);
  }
}
