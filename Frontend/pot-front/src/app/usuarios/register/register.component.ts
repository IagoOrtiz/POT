import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/reload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarios: Usuario[];

  nombre: string;
  apellido: string;
  email: string;
  password: string;

  errorMsg: string = 'Asegurate de rellenar todos los campos con * al final';

  constructor (private usuarioService: UsuarioService, private router: Router, private reloadService: ReloadService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
  }

  crearCuenta(): void {

    if (!this.nombre) {      
      Swal.fire({
        icon: 'error',
        title: 'Falta nombre',
        text: this.errorMsg
      })
    } else if (!this.apellido) {
      Swal.fire({
        icon: 'error',
        title: 'Faltan apellidos',
        text: this.errorMsg
      })
    } else if (!this.email) {
      Swal.fire({
        icon: 'error',
        title: 'Falta email',
        text: this.errorMsg
      })
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
      Swal.fire({
        icon: 'error',
        title: 'Email incorrecto',
        text: "Asegurate de introducir un correo valido"
      })
    } else if (!this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Falta contraseña',
        text: this.errorMsg
      })
    } else {
      this.usuario.nombre = this.nombre;
      this.usuario.apellido = this.apellido;
      this.usuario.email = this.email;
      this.usuario.password = this.password;

      this.usuarioService.create(this.usuario)
      .subscribe(response => {
        this.ngOnInit();

        this.reloadService.reloadComponent();
        this.router.navigate(['/publicaciones'])
        Swal.fire('Usuario creado', `¡Bienvenido a Pokemon Online Trading! Ya puedes inciar sesion`, 'success');
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Parece que ha habido un error',
          text: 'Por favor intentalo de nuevo más tarde'
        })
      }
    );
    }
  }

  // seleccionarFoto(event) {
  //   this.imagenSeleccionada = event.target.files[0];
  // }

  // this.usuarioService.subirFoto(this.imagenSeleccionada, this.usuarios[this.usuarios.length-1].id).subscribe(
  //   usuario => {
  //     this.usuario = usuario;
  //   }
  // );
}
