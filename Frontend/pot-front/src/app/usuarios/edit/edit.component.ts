import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import Swal from 'sweetalert2';
import { ReloadService } from 'src/app/reload.service';
import { map, retry } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  userId: number;
  usuario: Usuario = new Usuario();
  private imagenSeleccionada: File;

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem("userId"));
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.usuarioService.getUsuarioById(id).pipe(retry(3)).subscribe((usuario) => {
          this.usuario = usuario;
        })
      }
    })
  }

  update(): void{
      
    this.usuarioService.update(this.usuario)
    .subscribe(usuario => {
        this.usuario = usuario;
        sessionStorage.setItem('userId', this.usuario.id.toString());
        sessionStorage.setItem('nombre', this.usuario.nombre);
        sessionStorage.setItem('foto', this.usuario.foto);
        this.router.navigate(['/publicaciones']);
        this.reloadService.reloadComponent();
        Swal.fire('Usuario actualizado', `Datos actualizados con exito`, 'success');
      });

  }

  subirFoto() {
    if (this.imagenSeleccionada) {
      this.usuarioService.subirFoto(this.imagenSeleccionada, this.userId).subscribe(
        usuarioFoto => {
          Swal.fire("Cambio de foto exitoso", "La nueva imagen se vera reflejada tras guardar los cambios", 'success');
        }
      )
    }
  }
    
  seleccionarFoto(event) {
    this.imagenSeleccionada = event.target.files[0];
  }

  back() {
    this.location.back();
  }

  constructor(private usuarioService: UsuarioService, private router: Router,
    private activatedRoute: ActivatedRoute, private location: Location, private reloadService: ReloadService) { }

}
