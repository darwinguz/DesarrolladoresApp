import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CrearDesarrolladorPageComponent} from './crear-desarrollador-page.component';
import {DesarrolladorService} from '../../services/desarrollador.service';
import {TecnologiaService} from '../../services/tecnologia.service';
import {FormBuilder} from '@angular/forms';
import {MensajeService} from '../../services/mensaje.service';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../../app-routing.module';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmationService, MessageService} from 'primeng/api';

describe('CrearDesarrolladorPageComponent', () => {
  let component: CrearDesarrolladorPageComponent;
  let fixture: ComponentFixture<CrearDesarrolladorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule, MessagesModule, MessageModule],
      declarations: [CrearDesarrolladorPageComponent],
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
    fixture = TestBed.createComponent(CrearDesarrolladorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
