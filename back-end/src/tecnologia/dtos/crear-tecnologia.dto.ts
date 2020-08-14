import { IsString } from 'class-validator';

export class CrearTecnologiaDto {
  @IsString()
  readonly nombre: string;
}
