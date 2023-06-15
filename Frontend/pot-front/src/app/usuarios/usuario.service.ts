import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

private urlUsuarios: string = "http://localhost:8080/api/users";

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlUsuarios);
  }

  getUsuarioById(id): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlUsuarios+"/"+id);
  }

  create(usuario: Usuario) : Observable<Usuario> {
    return this.http.post<Usuario>(this.urlUsuarios, usuario, {headers: this.httpHeaders})
  }

  subirFoto(archivo: File, id): Observable<Usuario>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(this.urlUsuarios+"/upload", formData).pipe(
      map( (response: any) => response.usuario as Usuario));
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.urlUsuarios+"/"+usuario.id, usuario, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(this.urlUsuarios+"/"+id, {headers: this.httpHeaders});
  }
}
