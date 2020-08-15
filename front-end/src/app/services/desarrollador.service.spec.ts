import {TestBed} from '@angular/core/testing';

import {DesarrolladorService} from './desarrollador.service';
import {HttpClientModule} from '@angular/common/http';

describe('DesarrolladorService', () => {
  let service: DesarrolladorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DesarrolladorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
