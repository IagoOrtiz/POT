import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Publicacion } from '../publicacion';
import { PublicacionService } from '../publicacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem("userId"));
    this.cargarPublicacion();
  }

  userId: number;

  public publicacion: Publicacion = new Publicacion();
  public titulo: string = "Nueva publicación";

  public create(): void{

    this.publicacion.user = this.userId;
    for (let i = 0; i < 6; i++) {
      this.publicacion.ivs += this.publicacion.ivsForm[i]+"|";
    }
    for (let i = 0; i < 6; i++) {
      this.publicacion.evs += this.publicacion.evsForm[i]+"|";
    }

    if(!this.publicacion.nombre) {
      Swal.fire({
        icon: 'error',
        title: 'No hay Pokémon',
        text: "Asegurate de escojer el Pokémon que ofreces antes de enviar la publicación"
      })
    } else {
      this.publicacionService.create(this.publicacion)
        .subscribe(response => {
          this.router.navigate(['/publicaciones'])
          Swal.fire('Publicacion guardada', `Publicacion creada con exito`, 'success');
        }
      );
    }
    
  }

  public cargarPublicacion(): void {
    this.activatedRoute.params.subscribe(params =>  {
      let id = params['id']
      if(id){
        this.publicacionService.getPublicacionById(id).subscribe( (publicacion) => {
          this.publicacion = publicacion;
          this.publicacion.ivsForm = this.publicacion.ivs.split("|").map(str => Number(str));
          this.publicacion.evsForm = this.publicacion.evs.split("|").map(str => Number(str));
        })
      }
    })
  }

  public update():void{
    this.publicacionService.update(this.publicacion)
    .subscribe( publicacion => {
      this.router.navigate(['/publicaciones'])
      Swal.fire('Publicacion actualizada', `Publicacion actualizada con exito`, 'success');
    })
  }

  back() {
    this.location.back();
  }

  constructor(private publicacionService: PublicacionService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
    
  }
}
