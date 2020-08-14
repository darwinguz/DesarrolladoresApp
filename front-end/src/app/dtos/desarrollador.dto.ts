import {TecnologiaDto} from './tecnologia.dto';

export class DesarrolladorDto {
  id?: number;
  nombresCompletos: string;
  linkGitHub: string;
  tecnologiasConocidas?: TecnologiaDto[];
}

export class CrearDesarrolladorDto {
  readonly nombresCompletos: string;
  readonly linkGitHub: string;
  readonly idsTecnologiasConocidas: number[];
}

export class ActualizarDesarrolladorDto {
  readonly nombresCompletos: string;
  readonly linkGitHub: string;
  readonly idsTecnologiasConocidas: number[];
}
