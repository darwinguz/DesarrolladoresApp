import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnologiaEntity } from './tecnologia.entity';
import { TecnologiaService } from './tecnologia.service';
import { TecnologiaController } from './tecnologia.controller';

/**
 * Módulo de la entidad tecnología.
 * @author Darwin Guzmán
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([TecnologiaEntity]),
  ],
  providers: [TecnologiaService],
  controllers: [TecnologiaController],
  exports: [TecnologiaService],
})
export class TecnologiaModule {
}
