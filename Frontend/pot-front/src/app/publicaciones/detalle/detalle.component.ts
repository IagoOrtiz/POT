import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Publicacion } from '../publicacion';
import { PublicacionService } from '../publicacion.service';
import { BarController, BarElement, CategoryScale, Chart, LinearScale} from 'chart.js';

Chart.register(LinearScale, BarController, CategoryScale, BarElement);

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit{
  public publicacion: Publicacion = new Publicacion();

  userId: Number;
  ivChart: any;
  evChart: any;

  ngOnInit(): void {   
    this.userId = Number(sessionStorage.getItem("userId"));
    this.cargarPublicacion();

    this.ivChart = new Chart('ivChart', {
      type: 'bar',
      data: {
        labels: ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'],
        datasets: [{
          label: 'IVs',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(16, 120, 16, 1)',
            'rgba(166, 31, 18, 1)',
            'rgba(194, 164, 14, 1)',
            'rgba(11, 114, 212, 1)',
            'rgba(91, 1, 143, 1)',
            'rgba(194, 121, 4, 1)'
          ],
          borderColor: 'rgb(75, 192, 192)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 31
          }
        }
      }
    });

    this.evChart = new Chart('evChart', {
      type: 'bar',
      data: {
        labels: ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'],
        datasets: [{
          label: 'EVs',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(16, 120, 16, 1)',
            'rgba(166, 31, 18, 1)',
            'rgba(194, 164, 14, 1)',
            'rgba(11, 114, 212, 1)',
            'rgba(91, 1, 143, 1)',
            'rgba(194, 121, 4, 1)'
          ],
          borderColor: 'rgb(75, 192, 192)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 252
          }
        }
      }
    });

  }

  cargarPublicacion(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id){
        this.publicacionService.getPublicacionById(id).subscribe( (publicacion) => {
          this.publicacion = publicacion;
          this.ivChart.data.datasets[0].data = this.publicacion.ivs.split("|");
          this.ivChart.update();
          this.evChart.data.datasets[0].data = this.publicacion.evs.split("|");
          this.evChart.update();
        });
      }
    })
  }

  delete(publicacion: Publicacion): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-1',
        cancelButton: 'btn btn-danger m-1'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "Esta acción es irreversible, así que piensalo dos veces antes de pulsar.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.publicacionService.delete(publicacion.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              '¡Borrado!',
              'La publicación ha sido borrada con exito',
              'success'
            );
            this.back();
          }
        )
        
      }
    })
  }

  back() {
    this.location.back();
  }
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private publicacionService: PublicacionService, private location: Location) {}
}
