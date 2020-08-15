import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TecnologiaDto} from '../dtos/tecnologia.dto';

/**
 * Proveedor inyectable para manejar las solicitudes y respuestas HTTP para la colección de tecnologías.
 * @author Darwin Guzmán
 */
@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
  readonly URL_MODELO = environment.URL_BACKEND + 'technologies/';

  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Consulta todas las tecnologías registrados en la base de datos.
   * @return Observable<TecnologiaDto[]>
   */
  getSeleccionarTodos(): Observable<TecnologiaDto[]> {
    return this.httpClient.get<TecnologiaDto[]>(this.URL_MODELO);
  }
}
