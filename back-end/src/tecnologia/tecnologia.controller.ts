import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TecnologiaService } from './tecnologia.service';
import { TecnologiaEntity } from './tecnologia.entity';
import { CrearTecnologiaDto } from './dtos/crear-tecnologia.dto';

/**
 * Manejador de solicitudes y respuestas HTTP para la colección de tecnologías.
 * @author Darwin Guzmán
 */
@Controller('technologies')
export class TecnologiaController {
  constructor(private readonly tecnologiaService: TecnologiaService) {
  }

  /**
   * Define la ruta con el método POST para insertar tecnologías y si no hay
   * excepciones devuelve el resultado con un código de estado exitoso CREADO.
   * @param crearTecnologiaDto
   * @return Promise<TecnologiaEntity>
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  postInsertar(@Body() crearTecnologiaDto: CrearTecnologiaDto): Promise<TecnologiaEntity> {
    return this.tecnologiaService.insertar(crearTecnologiaDto);
  }

  /**
   * Define la ruta con el método GET para consultar todas las tecnologías y si no hay
   * excepciones devuelve el resultado con un código de estado exitoso APROBADO.
   * @return Promise<TecnologiaEntity[]>
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  getSeleccionarTodos(): Promise<TecnologiaEntity[]> {
    return this.tecnologiaService.seleccionarTodos();
  }
}
