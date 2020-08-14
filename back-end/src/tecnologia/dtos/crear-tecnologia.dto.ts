import { MaxLength } from 'class-validator';

export class CrearTecnologiaDto {
  @MaxLength(50, {
    message: 'El nombre debe tener máximo 50 caracteres.',
  }) readonly nombre: string;
}
