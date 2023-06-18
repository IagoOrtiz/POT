import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensaje } from './models/mensaje';
import { UsuarioService } from '../usuarios/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private client: Client;

  conectado: boolean = false;
  userId: number;

  mensaje: Mensaje = new Mensaje();
  mensajes: Mensaje[] = [];
  escribiendo: string;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.userId = Number(sessionStorage.getItem("userId"));
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS("http://localhost:8080/chat-websocket");
    }

    this.client.onConnect = (frame) => {
      this.conectado = true;

      this.client.subscribe('/chat/mensaje', e => {
        let mensaje: Mensaje = JSON.parse(e.body) as Mensaje;
        this.usuarioService.getUsuarioById(mensaje.userId).subscribe((usuario) => {
          mensaje.fecha = new Date(mensaje.fecha);
          switch (usuario.nombre[0].toUpperCase()) {
            case 'A': case 'B': case 'C': case 'D':
              mensaje.color = "red";
              break;
            case 'E': case 'F': case 'G': case 'H': case 'I':
              mensaje.color = "green";
              break;
            case 'J': case 'K': case 'L': case 'M':
              mensaje.color = "blue";
              break;
            case 'N': case 'Ñ': case 'O': case 'P': case 'Q':
              mensaje.color = "magenta";
              break;
            case 'R': case 'S': case 'T': case 'U':
              mensaje.color = "purple";
              break;
            case 'V': case 'W': case 'X': case 'Y': case 'Z':
              mensaje.color = "orange";
              break;
            default:
              mensaje.color = "gray";
              break;
          }

          if (usuario.foto) {
            mensaje.foto = usuario.foto;
          } else {
            mensaje.foto = "default.jpg";
          }

          mensaje.nombre = usuario.nombre;
          this.mensajes.push(mensaje);
        })
        
      });

      this.client.subscribe('/chat/escribiendo', e => {
        this.usuarioService.getUsuarioById(e.body).subscribe((usuario) => {
          this.escribiendo = usuario.nombre+" esta escribiendo...";
          setTimeout(() => this.escribiendo = '', 3000)
        })
      });
    }

    this.client.onDisconnect = (frame) => {
      this.conectado = false;
    }

  }

  conectar(): void {
    this.client.activate();
  }

  desconectar(): void {
    this.client.deactivate();
  }

  enviarMensaje(): void {
    if(this.mensaje.texto) {
      this.mensaje.userId = this.userId;
      this.client.publish({ destination: '/app/mensaje', body: JSON.stringify(this.mensaje) });
      this.mensaje.texto = '';
      this.escribiendo = '';
    }
  }

  enviarTexto(event): void {
    if (event.key === "Enter") {
      this.enviarMensaje();
    }
  }

  escribiendoEvento(event): void {
    if (event.key !== "Enter") {
      this.client.publish({destination: '/app/escribiendo', body: this.userId.toString()});
    }
  }

}
