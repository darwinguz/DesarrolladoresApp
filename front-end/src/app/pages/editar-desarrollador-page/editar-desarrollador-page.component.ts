import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TecnologiaDto} from '../../dtos/tecnologia.dto';
import {DesarrolladorService} from '../../services/desarrollador.service';
import {TecnologiaService} from '../../services/tecnologia.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActualizarDesarrolladorDto, DesarrolladorDto} from '../../dtos/desarrollador.dto';
import {map, switchMap} from 'rxjs/operators';
import {MensajeService} from '../../services/mensaje.service';

/**
 * Componente para editar desarrolladores.
 * @author Darwin Guzmán
 */
@Component({
  selector: 'app-editar-desarrollador-page',
  templateUrl: './editar-desarrollador-page.component.html',
  styleUrls: ['./editar-desarrollador-page.component.css']
})
export class EditarDesarrolladorPageComponent implements OnInit {
  actualizarDesarrolladorFormGroup: FormGroup;
  desarrolladorPorActualizarDto: DesarrolladorDto;
  tecnologiasDtos: TecnologiaDto[];

  constructor(
    private readonly desarrolladorService: DesarrolladorService,
    private readonly tecnologiaService: TecnologiaService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly mensajeService: MensajeService
  ) {
    this.actualizarDesarrolladorFormGroup = this.formBuilder.group({
      nombresCompletos: new FormControl('', Validators.required),
      linkGitHub: new FormControl('', Validators.required),
      tecnologias: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(id => this.desarrolladorService.getSeleccionarPorId(id))
    ).subscribe(desarrolladorDto => {
        this.desarrolladorPorActualizarDto = desarrolladorDto;
        this.llenarCamposFormulario(desarrolladorDto);
      },
      error => this.mensajeService.mostrarMessageError(error.error.message)
    );
    this.tecnologiaService.getSeleccionarTodos().subscribe(value => this.tecnologiasDtos = value);
  }

  private llenarCamposFormulario(desarrolladorDto: DesarrolladorDto): void {
    this.actualizarDesarrolladorFormGroup.get('nombresCompletos').setValue(desarrolladorDto.nombresCompletos);
    this.actualizarDesarrolladorFormGroup.get('linkGitHub').setValue(desarrolladorDto.linkGitHub);
    this.actualizarDesarrolladorFormGroup.get('tecnologias').setValue(desarrolladorDto.tecnologiasConocidas);
  }

  onClickGuardar(valuesForm: any): void {
    if (this.actualizarDesarrolladorFormGroup.valid) {
      const actualizarDesarrolladorDto: ActualizarDesarrolladorDto = {
        nombresCompletos: valuesForm.nombresCompletos,
        linkGitHub: valuesForm.linkGitHub,
        idsTecnologiasConocidas: valuesForm.tecnologias.map(it => it.id)
      };
      this.desarrolladorService.postInsertar(actualizarDesarrolladorDto).subscribe(
        () => {
          this.mensajeService.mostrarToastExito(`Desarrollador ${actualizarDesarrolladorDto.nombresCompletos} actualizado.`);
          this.router.navigateByUrl('/').then();
        },
        error => this.mensajeService.mostrarMessageError(error.error.message)
      );
    } else {
      Object.keys(this.actualizarDesarrolladorFormGroup.controls)
        .forEach(key => this.actualizarDesarrolladorFormGroup.controls[key].markAsDirty());
    }
  }
}
