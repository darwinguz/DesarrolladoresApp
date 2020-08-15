import {TestBed} from '@angular/core/testing';

import {MensajeService} from './mensaje.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmationService, MessageService} from 'primeng/api';

describe('MensajeService', () => {
  let service: MensajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MessagesModule, MessageModule],
      providers: [
        MensajeService,
        MessageService,
        ConfirmationService
      ]
    });
    service = TestBed.inject(MensajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
