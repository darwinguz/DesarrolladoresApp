import {TestBed} from '@angular/core/testing';

import {TecnologiaService} from './tecnologia.service';
import {HttpClientModule} from '@angular/common/http';

describe('TecnologiaService', () => {
  let service: TecnologiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TecnologiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
