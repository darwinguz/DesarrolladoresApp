import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditarDesarrolladorPageComponent} from './editar-desarrollador-page.component';
import {DesarrolladorService} from '../../services/desarrollador.service';
import {TecnologiaService} from '../../services/tecnologia.service';
import {FormBuilder} from '@angular/forms';
import {MensajeService} from '../../services/mensaje.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../../app-routing.module';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

describe('EditarDesarrolladorPageComponent', () => {
  let component: EditarDesarrolladorPageComponent;
  let fixture: ComponentFixture<EditarDesarrolladorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule, MessagesModule, MessageModule],
      declarations: [EditarDesarrolladorPageComponent],
      providers: [
        DesarrolladorService,
        TecnologiaService,
        FormBuilder,
        MensajeService,
        MessageService,
        ConfirmationService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDesarrolladorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
