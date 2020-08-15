import { IsArray, IsUrl, MaxLength } from 'class-validator';

export class CrearDesarrolladorDto {
  @MaxLength(150, {
    message: 'Los nombres deben tener máximo 150 caracteres.',
  })
  readonly nombresCompletos: string;

  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
  }, {
    message: 'Ingrese un enlace válido de GitHub, por ejemplo: "https://github.com/darwinguz".',
  }) readonly linkGitHub: string;

  @IsArray()
  readonly idsTecnologiasConocidas: number[];
}
