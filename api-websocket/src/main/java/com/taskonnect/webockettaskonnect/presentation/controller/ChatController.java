package com.taskonnect.webockettaskonnect.presentation.controller;

import com.taskonnect.webockettaskonnect.domain.dtos.MensajeDTO;
import com.taskonnect.webockettaskonnect.domain.dtos.NotificacionLecturaDTO;
import com.taskonnect.webockettaskonnect.domain.entities.Usuario;
import com.taskonnect.webockettaskonnect.domain.exception.ChatException;
import com.taskonnect.webockettaskonnect.domain.exception.PermissionDeniedException;
import com.taskonnect.webockettaskonnect.application.usecases.ChatService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/enviar-mensaje")
    public void enviarMensaje(@Valid @Payload MensajeDTO mensajeDTO) {
        System.out.println("CONTROLADOR: Mensaje recibido: " + mensajeDTO);

        try {
            MensajeDTO mensajeGuardado = chatService.guardarMensaje(mensajeDTO);
            System.out.println("CONTROLADOR: Mensaje guardado en BD: " + mensajeGuardado);

            List<Usuario> participantes = chatService.getParticipantes(mensajeDTO.getChatId());
            System.out.println("CONTROLADOR: Participantes encontrados: " + participantes.size());

            for (Usuario participante : participantes) {
                System.out.println("CONTROLADOR: Enviando a usuario ID: " + participante.getId());

                messagingTemplate.convertAndSendToUser(
                        String.valueOf(participante.getId()),
                        "/queue/mensajes",
                        mensajeGuardado
                );
            }

            System.out.println("CONTROLADOR: Mensaje enviado a todos los participantes");

        } catch (PermissionDeniedException e) {
            System.err.println("CONTROLADOR: Permiso denegado: " + e.getMessage());
            enviarErrorAlUsuario(mensajeDTO.getAutorId(), "PERMISSION_DENIED", e.getMessage());

        } catch (ChatException e) {
            System.err.println("CONTROLADOR: Error de chat: " + e.getMessage());
            enviarErrorAlUsuario(mensajeDTO.getAutorId(), e.getErrorCode(), e.getMessage());

        } catch (IllegalArgumentException e) {
            System.err.println("CONTROLADOR: Datos inválidos: " + e.getMessage());
            enviarErrorAlUsuario(mensajeDTO.getAutorId(), "INVALID_DATA", e.getMessage());

        } catch (Exception e) {
            System.err.println("CONTROLADOR: Error inesperado: " + e.getMessage());
            e.printStackTrace();
            enviarErrorAlUsuario(mensajeDTO.getAutorId(), "INTERNAL_ERROR", "Ha ocurrido un error interno del servidor");
        }
    }

    @MessageMapping("/public")
    @SendTo("/topic/public")
    public MensajeDTO enviarMensajePublico(@Valid @Payload MensajeDTO mensajeDTO) {
        System.out.println("CONTROLADOR: Mensaje público recibido: " + mensajeDTO);
        mensajeDTO.setAutorNombre("Usuario " + mensajeDTO.getAutorId());
        return mensajeDTO;
    }

    @MessageMapping("/marcar-leido")
    public void marcarLeido(@Valid @Payload NotificacionLecturaDTO notificacion) {
        try {
            System.out.println("CONTROLADOR: Marcando mensaje como leído: " + notificacion);

            boolean esParticipante = chatService.verificarParticipante(
                    notificacion.getChatId(),
                    notificacion.getUsuarioId().intValue()
            );

            if (!esParticipante) {
                throw new PermissionDeniedException("No tienes permiso para marcar mensajes en este chat");
            }

            chatService.marcarMensajeComoLeido(notificacion.getMensajeId(), notificacion.getUsuarioId());

            Integer autorId = chatService.getAutorMensaje(notificacion.getMensajeId());
            messagingTemplate.convertAndSendToUser(
                    autorId.toString(),
                    "/queue/notificaciones-lectura",
                    notificacion
            );

            System.out.println("✅ CONTROLADOR: Notificación de lectura enviada al autor: " + autorId);

        } catch (PermissionDeniedException e) {
            System.err.println("🚫 CONTROLADOR: Permiso denegado para lectura: " + e.getMessage());
            enviarErrorAlUsuario(notificacion.getUsuarioId().intValue(), "PERMISSION_DENIED", e.getMessage());

        } catch (Exception e) {
            System.err.println("❌ CONTROLADOR: Error al marcar como leído: " + e.getMessage());
            e.printStackTrace();
            enviarErrorAlUsuario(notificacion.getUsuarioId().intValue(), "INTERNAL_ERROR", "Error al marcar mensaje como leído");
        }
    }

    private void enviarErrorAlUsuario(Integer usuarioId, String errorCode, String mensaje) {
        MensajeDTO mensajeError = new MensajeDTO();
        mensajeError.setContenido(mensaje);
        mensajeError.setAutorNombre("Sistema");

        ErrorNotification error = new ErrorNotification(errorCode, mensaje, System.currentTimeMillis());

        messagingTemplate.convertAndSendToUser(
                String.valueOf(usuarioId),
                "/queue/errores",
                error
        );
    }

    public static class ErrorNotification {
        private String code;
        private String message;
        private long timestamp;

        public ErrorNotification(String code, String message, long timestamp) {
            this.code = code;
            this.message = message;
            this.timestamp = timestamp;
        }

        public String getCode() { return code; }
        public String getMessage() { return message; }
        public long getTimestamp() { return timestamp; }
    }
}