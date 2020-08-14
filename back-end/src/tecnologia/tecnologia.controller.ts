import { Controller, Get } from '@nestjs/common';
import { TecnologiaService } from './tecnologia.service';
import { TecnologiaEntity } from './tecnologia.entity';

@Controller('technologies')
export class TecnologiaController {
  constructor(private readonly tecnologiaService: TecnologiaService) {
  }

  @Get()
  getSeleccionarTodos(): Promise<TecnologiaEntity[]> {
    return this.tecnologiaService.seleccionarTodos();
  }
}
