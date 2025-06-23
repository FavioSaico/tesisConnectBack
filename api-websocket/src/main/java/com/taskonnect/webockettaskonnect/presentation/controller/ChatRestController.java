package com.taskonnect.webockettaskonnect.presentation.controller;

import com.taskonnect.webockettaskonnect.domain.dtos.ChatDTO;
import com.taskonnect.webockettaskonnect.domain.dtos.CrearChatDTO;
import com.taskonnect.webockettaskonnect.domain.dtos.MensajeDTO;
import com.taskonnect.webockettaskonnect.domain.exception.PermissionDeniedException;
import com.taskonnect.webockettaskonnect.application.usecases.ChatService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "*")
public class ChatRestController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatDTO> crearChat(@Valid @RequestBody CrearChatDTO crearChatDTO) {
        ChatDTO nuevoChat = chatService.crearChat(crearChatDTO);
        return ResponseEntity.ok(nuevoChat);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ChatDTO>> obtenerChatsDeUsuario(
            @PathVariable @Positive(message = "El ID del usuario debe ser positivo") Integer usuarioId) {
        List<ChatDTO> chats = chatService.obtenerChatsDeUsuario(usuarioId);
        return ResponseEntity.ok(chats);
    }

    @GetMapping("/{chatId}/mensajes")
    public ResponseEntity<Page<MensajeDTO>> obtenerMensajesDeChat(
            @PathVariable @Positive(message = "El ID del chat debe ser positivo") Integer chatId,
            @RequestParam(defaultValue = "0") @Min(value = 0, message = "La página debe ser 0 o mayor") int page,
            @RequestParam(defaultValue = "20") @Min(value = 1, message = "El tamaño debe ser al menos 1") @Max(value = 100, message = "El tamaño máximo es 100") int size,
            @RequestParam @Positive(message = "El ID del usuario debe ser positivo") Integer usuarioId) {

        boolean esParticipante = chatService.verificarParticipante(chatId, usuarioId);
        if (!esParticipante) {
            throw new PermissionDeniedException("No tienes permiso para acceder a este chat");
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaHora").descending());
        Page<MensajeDTO> mensajes = chatService.obtenerMensajesDeChat(chatId, pageable);
        return ResponseEntity.ok(mensajes);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<ChatDTO> obtenerChat(
            @PathVariable @Positive(message = "El ID del chat debe ser positivo") Integer chatId,
            @RequestParam @Positive(message = "El ID del usuario debe ser positivo") Integer usuarioId) {

        boolean esParticipante = chatService.verificarParticipante(chatId, usuarioId);
        if (!esParticipante) {
            throw new PermissionDeniedException("No tienes permiso para acceder a este chat");
        }

        ChatDTO chat = chatService.obtenerChatPorId(chatId);
        return ResponseEntity.ok(chat);
    }

    @GetMapping("/entre-usuarios")
    public ResponseEntity<ChatDTO> buscarOCrearChatEntreUsuarios(
            @RequestParam @Positive(message = "El ID del usuario1 debe ser positivo") Integer usuario1Id,
            @RequestParam @Positive(message = "El ID del usuario2 debe ser positivo") Integer usuario2Id) {

        if (usuario1Id.equals(usuario2Id)) {
            throw new IllegalArgumentException("No puedes crear un chat contigo mismo");
        }

        ChatDTO chat = chatService.buscarOCrearChatEntreUsuarios(usuario1Id, usuario2Id);
        return ResponseEntity.ok(chat);
    }
}