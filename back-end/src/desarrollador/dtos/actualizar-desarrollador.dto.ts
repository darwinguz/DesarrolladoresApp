import { IsArray, IsString } from 'class-validator';

export class ActualizarDesarrolladorDto {
  @IsString()
  readonly nombresCompletos: string;

  @IsString()
  readonly linkGitHub: string;

  @IsArray()
  readonly idsTecnologiasConocidas: number[];
}
