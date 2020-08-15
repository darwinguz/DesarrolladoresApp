import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MensajeService} from './services/mensaje.service';
import {ConfirmationService, MessageService} from 'primeng/api';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MessagesModule, MessageModule],
      declarations: [
        AppComponent
      ],
      providers: [
        MensajeService,
        MessageService,
        ConfirmationService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'front-end'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('front-end');
  });
});
