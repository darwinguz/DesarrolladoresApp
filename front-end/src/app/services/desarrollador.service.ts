import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ActualizarDesarrolladorDto, CrearDesarrolladorDto, DesarrolladorDto} from '../dtos/desarrollador.dto';

@Injectable({
  providedIn: 'root'
})
export class DesarrolladorService {
  readonly URL_MODELO = environment.URL_BACKEND + 'developers/';

  constructor(private readonly httpClient: HttpClient) {
  }

  postInsertar(crearDesarrolladorDto: CrearDesarrolladorDto): Observable<DesarrolladorDto> {
    return this.httpClient.post<DesarrolladorDto>(this.URL_MODELO, crearDesarrolladorDto);
  }

  getSeleccionarTodos(): Observable<DesarrolladorDto[]> {
    return this.httpClient.get<DesarrolladorDto[]>(this.URL_MODELO);
  }

  getSeleccionarPorId(id: number): Observable<DesarrolladorDto> {
    return this.httpClient.get<DesarrolladorDto>(this.URL_MODELO + id);
  }

  putActualizar(id: number, actualizarDesarrolladorDto: ActualizarDesarrolladorDto): Observable<DesarrolladorDto> {
    return this.httpClient.put<DesarrolladorDto>(this.URL_MODELO + id, actualizarDesarrolladorDto);
  }

  deleteEliminar(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.URL_MODELO + id);
  }

}
