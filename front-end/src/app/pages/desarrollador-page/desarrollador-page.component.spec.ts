import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DesarrolladorPageComponent} from './desarrollador-page.component';
import {DesarrolladorService} from '../../services/desarrollador.service';
import {MensajeService} from '../../services/mensaje.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../../app-routing.module';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

describe('DesarrolladorPageComponent', () => {
  let component: DesarrolladorPageComponent;
  let fixture: ComponentFixture<DesarrolladorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule, MessagesModule, MessageModule],
      declarations: [DesarrolladorPageComponent],
      providers: [
        DesarrolladorService,
        MensajeService,
        MessageService,
        ConfirmationService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesarrolladorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
