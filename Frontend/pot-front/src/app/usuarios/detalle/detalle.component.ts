import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioService } from '../usuario.service';
import { PublicacionService } from 'src/app/publicaciones/publicacion.service';
import { Usuario } from '../usuario';
import { Publicacion } from 'src/app/publicaciones/publicacion';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class UserDetalleComponent implements OnInit {

  usuario: Usuario = new Usuario;
  publicaciones: Publicacion[];
  userId: number;

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem("userId"));
    this.cargarUsuario();
    this.cargarPublicaciones();
  }

  cargarUsuario() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.usuarioService.getUsuarioById(id).subscribe((usuario) => {
          if (!usuario.foto) {
            usuario.foto = "default.jpg"
          }
          this.usuario = usuario;
          
        })
      }
    })
  }

  cargarPublicaciones() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.publicacionService.getPublicacionesByUsuario(id).subscribe((publicaciones) => {
          this.publicaciones = publicaciones;
          console.log(publicaciones);
          console.log(this.usuario.id);
        })
      }
    });
  }

  constructor(private usuarioService: UsuarioService, private router: Router, 
    private activatedRoute: ActivatedRoute, private location: Location, private publicacionService: PublicacionService) { }
}
