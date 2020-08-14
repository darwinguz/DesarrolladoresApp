import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TecnologiaDto} from '../dtos/tecnologia.dto';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
  readonly URL_MODELO = environment.URL_BACKEND + 'technologies/';

  constructor(private readonly httpClient: HttpClient) {
  }

  getSeleccionarTodos(): Observable<TecnologiaDto[]> {
    return this.httpClient.get<TecnologiaDto[]>(this.URL_MODELO);
  }
}
