import { Component, OnInit } from '@angular/core';
import { Publicacion } from './publicacion';
import { PublicacionService } from './publicacion.service';
import { Usuario } from '../usuarios/usuario';
import { map, retry } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {

  publicaciones: Publicacion[];
  usuarios: Usuario[];
  error: boolean=false;

  constructor(private publicacionService: PublicacionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.publicacionService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );

    this.activatedRoute.params.subscribe(params => {
      let busqueda = params['nombre'];
      if (!busqueda) {
        this.publicacionService.getPublicaciones().pipe(
          map(publicaciones => {
            for (let i = 0; i < publicaciones.length; i++) {
              for (let j = 0; j < this.usuarios.length; j++) {
                if (this.usuarios[j].id === publicaciones[i].user) {
                  if (!this.usuarios[j].foto) {
                    publicaciones[i].userImagen = "default.jpg"
                  } else {
                    publicaciones[i].userImagen = this.usuarios[j].foto;
                  }
                  break;
                }
              }
            }
            return publicaciones;
          }),
          retry(3)
        ).subscribe((publicaciones) => {
            this.publicaciones = publicaciones;
          }, error => {
            this.error = true;
          }
        );
      } else {
        this.publicacionService.getPublicacionesBusqueda(busqueda).pipe(
          map(publicaciones => {
            for (let i = 0; i < publicaciones.length; i++) {
              for (let j = 0; j < this.usuarios.length; j++) {
                if (this.usuarios[j].id === publicaciones[i].user) {
                  publicaciones[i].userImagen = this.usuarios[j].foto;
                  break;
                }
              }
            }
            return publicaciones;
          })
        ).subscribe((publicaciones) => {
            this.publicaciones = publicaciones;
          }, error => {
            this.error = true;
          }
        );
      }
    })
    
  }

}
