import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesarrolladorEntity } from './desarrollador.entity';
import { DesarrolladorController } from './desarrollador.controller';
import { DesarrolladorService } from './desarrollador.service';
import { TecnologiaModule } from '../tecnologia/tecnologia.module';

/**
 * Módulo de la entidad desarrollador.
 * @author Darwin Guzmán
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([DesarrolladorEntity]),
    TecnologiaModule
  ],
  controllers: [
    DesarrolladorController,
  ],
  providers: [
    DesarrolladorService,
  ],
})
export class DesarrolladorModule {
}
