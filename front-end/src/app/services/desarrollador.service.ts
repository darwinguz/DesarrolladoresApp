import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ActualizarDesarrolladorDto, CrearDesarrolladorDto, DesarrolladorDto} from '../dtos/desarrollador.dto';

/**
 * Proveedor inyectable para manejar las solicitudes y respuestas HTTP para la colección de desarrolladores.
 * @author Darwin Guzmán
 */
@Injectable({
  providedIn: 'root'
})
export class DesarrolladorService {
  readonly URL_MODELO = environment.URL_BACKEND + 'developers/';

  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Inserta un desarrollador a la base de datos.
   * @param crearDesarrolladorDto objeto de transferencia de datos para crear un desarrollador.
   * @return Promise<DesarrolladorDto>
   */
  postInsertar(crearDesarrolladorDto: CrearDesarrolladorDto): Observable<DesarrolladorDto> {
    return this.httpClient.post<DesarrolladorDto>(this.URL_MODELO, crearDesarrolladorDto);
  }

  /**
   * Consulta todos los desarrolladores registrados en la base de datos.
   * @return Observable<DesarrolladorDto[]>
   */
  getSeleccionarTodos(): Observable<DesarrolladorDto[]> {
    return this.httpClient.get<DesarrolladorDto[]>(this.URL_MODELO);
  }

  /**
   * Consulta el desarrollador con el identificador especificado.
   * @param id identificador único del desarrollador.
   * @return Observable<DesarrolladorDto>
   */
  getSeleccionarPorId(id: number): Observable<DesarrolladorDto> {
    return this.httpClient.get<DesarrolladorDto>(this.URL_MODELO + id);
  }

  /**
   * Actualiza los datos de un desarrollador por su identificador.
   * @param id identificador único del desarrollador.
   * @param actualizarDesarrolladorDto objeto de transferencia de datos para actualizar un desarrollador.
   * @return Observable<DesarrolladorDto>
   */
  putActualizar(id: number, actualizarDesarrolladorDto: ActualizarDesarrolladorDto): Observable<DesarrolladorDto> {
    return this.httpClient.put<DesarrolladorDto>(this.URL_MODELO + id, actualizarDesarrolladorDto);
  }

  /**
   * Elimina un desarrollador según su identificador.
   * @param id identificador único del desarrollador.
   * @return Observable<void>
   */
  deleteEliminar(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.URL_MODELO + id);
  }

}
