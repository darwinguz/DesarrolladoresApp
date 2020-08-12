import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnologiaEntity } from './tecnologia.entity';
import { TecnologiaService } from './tecnologia.service';

/**
 * Módulo de la entidad tecnología.
 * @author Darwin Guzmán
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([TecnologiaEntity]),
  ],
  providers: [TecnologiaService],
  exports: [TecnologiaService],
})
export class TecnologiaModule {
}
