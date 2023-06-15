import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { ReloadService } from '../reload.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor (private router: Router, private reloadService: ReloadService, private location: Location) {}

  userId: number;
  foto: String;
  nombre: String;
  pokemonInput: String;

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem("userId"));
    this.foto = sessionStorage.getItem("foto");
    this.nombre = sessionStorage.getItem("nombre");

    this.reloadService.reload$.subscribe(() => {
      this.ngOnInit();
    });
  }

  cierraSesion() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('foto');
    this.ngOnInit();
    this.router.navigate(['/welcome']);
  }
}
