import { Injectable } from '@angular/core';
import { Publicacion } from './publicacion';
import { Usuario } from '../usuarios/usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private urlPublicaciones:string = 'http://localhost:8080/api/publicaciones';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.urlPublicaciones);
  }

  getPublicacionesBusqueda(nombre): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.urlPublicaciones+"/"+nombre);
  }

  getPublicacionById(id): Observable<Publicacion> {
    return this.http.get<Publicacion>(this.urlPublicaciones+"/detalle/"+id);
  }

  getPublicacionesByUsuario(id): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.urlPublicaciones+"/user/"+id);
  }

  //Necesario para recuperar la información de imagen de usuario
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>("http://localhost:8080/api/users");
  }
  
  create(publicacion: Publicacion) : Observable<Publicacion> {
    return this.http.post<Publicacion>(this.urlPublicaciones, publicacion, {headers: this.httpHeaders})
  }

  update(publicacion: Publicacion): Observable<Publicacion> {
    return this.http.put<Publicacion>(this.urlPublicaciones+"/"+publicacion.id, publicacion, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Publicacion>{
    return this.http.delete<Publicacion>(this.urlPublicaciones+"/"+id, {headers: this.httpHeaders});
  }

}
