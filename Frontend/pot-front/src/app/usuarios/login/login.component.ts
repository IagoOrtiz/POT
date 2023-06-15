import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import Swal from 'sweetalert2';
import { ReloadService } from 'src/app/reload.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  usuarios: Usuario[];
  email: String;
  password: String;
  error: boolean=false;
  validUser: boolean=false;
  validUserMarker: number;

  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute, private reloadService: ReloadService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
  }

  iniciaSesion() {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].email === this.email && this.usuarios[i].password === this.password) {
        this.validUserMarker = i;
        this.validUser = true;
        break;
      }
    }
    if (this.validUser) {
      sessionStorage.setItem('userId', this.usuarios[this.validUserMarker].id.toString());
      if (this.usuarios[this.validUserMarker].foto) {
        sessionStorage.setItem('foto', this.usuarios[this.validUserMarker].foto);
      } else {
        sessionStorage.setItem('foto', 'default.jpg');
      }
      sessionStorage.setItem('nombre', this.usuarios[this.validUserMarker].nombre);

      this.reloadService.reloadComponent();
      this.router.navigate(['/publicaciones'])
      Swal.fire('Inicio de sesión exitoso', `Bienvenid@ ${this.usuarios[this.validUserMarker].nombre}`, 'success');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Fallo de autenticación',
        text: 'La contraseña o el correo son incorrectos'
      })
    }
  }
  

}
