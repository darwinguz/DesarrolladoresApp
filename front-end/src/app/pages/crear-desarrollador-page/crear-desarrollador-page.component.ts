import {Component, OnInit} from '@angular/core';
import {DesarrolladorService} from '../../services/desarrollador.service';
import {TecnologiaDto} from '../../dtos/tecnologia.dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TecnologiaService} from '../../services/tecnologia.service';
import {CrearDesarrolladorDto} from '../../dtos/desarrollador.dto';
import {Router} from '@angular/router';
import {MensajeService} from '../../services/mensaje.service';

/**
 * Componente para crear desarrolladores.
 * @author Darwin Guzmán
 */
@Component({
  selector: 'app-crear-desarrollador-page',
  templateUrl: './crear-desarrollador-page.component.html',
  styleUrls: ['./crear-desarrollador-page.component.css']
})
export class CrearDesarrolladorPageComponent implements OnInit {
  crearDesarrolladorFormGroup: FormGroup;
  tecnologiasDtos: TecnologiaDto[];

  constructor(
    private readonly desarrolladorService: DesarrolladorService,
    private readonly tecnologiaService: TecnologiaService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly mensajeService: MensajeService
  ) {
    this.crearDesarrolladorFormGroup = this.formBuilder.group({
      nombresCompletos: new FormControl('', Validators.required),
      linkGitHub: new FormControl('', Validators.required),
      tecnologias: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.tecnologiaService.getSeleccionarTodos().subscribe(value => this.tecnologiasDtos = value);
  }

  onClickGuardar(valuesForm: any): void {
    if (this.crearDesarrolladorFormGroup.valid) {
      const crearDesarrolladorDto: CrearDesarrolladorDto = {
        nombresCompletos: valuesForm.nombresCompletos,
        linkGitHub: valuesForm.linkGitHub,
        idsTecnologiasConocidas: valuesForm.tecnologias.map(it => it.id)
      };
      this.desarrolladorService.postInsertar(crearDesarrolladorDto).subscribe(
        (desarrolladorDto) => {
          this.mensajeService.mostrarToastExito(`Desarrollador ${desarrolladorDto.nombresCompletos} creado.`);
          this.router.navigateByUrl('/');
        },
        error => this.mensajeService.mostrarMessageError(error.error.message)
      );
    } else {
      Object.keys(this.crearDesarrolladorFormGroup.controls).forEach(key => this.crearDesarrolladorFormGroup.controls[key].markAsDirty());
    }
  }
}
