import {Component, OnInit} from '@angular/core';
import {DesarrolladorService} from '../../services/desarrollador.service';
import {DesarrolladorDto} from '../../dtos/desarrollador.dto';
import {Router} from '@angular/router';
import {MensajeService} from '../../services/mensaje.service';

@Component({
  selector: 'app-desarrollador-page',
  templateUrl: './desarrollador-page.component.html',
  styleUrls: ['./desarrollador-page.component.css']
})
export class DesarrolladorPageComponent implements OnInit {
  desarrolladoresDtos: DesarrolladorDto[];
  columnas: { field: string, header: string }[];

  constructor(
    private readonly desarrolladorService: DesarrolladorService,
    private readonly router: Router,
    private readonly mensajeService: MensajeService
  ) {
    this.columnas = [
      {field: 'nombresCompletos', header: 'Nombres'},
      {field: 'linkGitHub', header: 'GitHub'},
      {field: 'tecnologiasConocidas', header: 'Tecnologías'},
    ];
  }

  ngOnInit(): void {
    this.desarrolladorService.getSeleccionarTodos().subscribe(value => this.desarrolladoresDtos = value);
  }

  onClickEditar(desarrolladorDto: DesarrolladorDto): void {
    this.router.navigateByUrl(`/editar-desarrollador/${desarrolladorDto.id}`).then();
  }

  onClickEliminar(desarrolladorDto: DesarrolladorDto): void {
    this.mensajeService.mostrarMensajeConfirmacion(
      `¿Está seguro que desea eliminar al desarrollador ${desarrolladorDto.nombresCompletos}?`,
      () => {
        this.desarrolladorService.deleteEliminar(desarrolladorDto.id).subscribe(
          () => this.desarrolladoresDtos = this.desarrolladoresDtos.filter(it => it.id !== desarrolladorDto.id),
          error => this.mensajeService.mostrarMessageError(error.error.message)
        );
      }
    );
  }

  onClickNuevo(): void {
    this.router.navigateByUrl('/crear-desarrollador').then();
  }
}
