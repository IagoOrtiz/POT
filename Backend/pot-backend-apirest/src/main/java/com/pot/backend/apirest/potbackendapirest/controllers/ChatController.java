package com.pot.backend.apirest.potbackendapirest.controllers;

import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.pot.backend.apirest.potbackendapirest.models.documents.Mensaje;

@Controller
public class ChatController {
    
    @MessageMapping("/mensaje")
    @SendTo("/chat/mensaje")
    public Mensaje recibeMensaje(Mensaje mensaje) {
        mensaje.setFecha(new Date().getTime());
        mensaje.setTexto(mensaje.getTexto());

        return mensaje;
    }

    @MessageMapping("/escribiendo")
    @SendTo("/chat/escribiendo")
    public Long estaEscribiendo(String idText) {
        Long id = Long.parseLong(idText);
        return id;
    }

}
