package com.taskonnect.webockettaskonnect.application.usecases;

import com.taskonnect.webockettaskonnect.domain.dtos.ChatDTO;
import com.taskonnect.webockettaskonnect.domain.dtos.CrearChatDTO;
import com.taskonnect.webockettaskonnect.domain.dtos.MensajeDTO;
import com.taskonnect.webockettaskonnect.domain.entities.*;
import com.taskonnect.webockettaskonnect.domain.exception.ChatException;
import com.taskonnect.webockettaskonnect.domain.exception.PermissionDeniedException;
import com.taskonnect.webockettaskonnect.infrastructure.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    ChatRepository chatRepository;

    @Autowired
    MensajeRepository mensajeRepository;

    @Autowired
    ParticipanteChatRepository participanteChatRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    EstadosLecturaRepository estadosLecturaRepository;

    @Autowired
    EstadosConversacionRepository estadosConversacionRepository;

    @Transactional
    public MensajeDTO guardarMensaje(MensajeDTO mensajeDTO) {
        validarMensajeDTO(mensajeDTO);

        try {
            if (!verificarParticipante(mensajeDTO.getChatId(), mensajeDTO.getAutorId())) {
                throw new PermissionDeniedException("No tienes permiso para enviar mensajes en este chat");
            }

            Chat chat = chatRepository.findById(mensajeDTO.getChatId())
                    .orElseThrow(() -> new ChatException("Chat no encontrado", "CHAT_NOT_FOUND"));

            if (!"activo".equalsIgnoreCase(chat.getEstado().getTipo())) {
                throw new ChatException("No se pueden enviar mensajes a un chat " + chat.getEstado().getTipo(), "CHAT_INACTIVE");
            }

            EstadosLectura estadoEnviado = estadosLecturaRepository.findByTipoIgnoreCase("enviado");
            if (estadoEnviado == null) {
                throw new ChatException("Configuración de estados incorrecta", "CONFIG_ERROR");
            }

            Usuario autor = usuarioRepository.findById(mensajeDTO.getAutorId())
                    .orElseThrow(() -> new ChatException("Usuario no encontrado", "USER_NOT_FOUND"));

            Mensaje mensaje = new Mensaje();
            mensaje.setChat(chat);
            mensaje.setAutor(autor);
            mensaje.setContenido(mensajeDTO.getContenido().trim());
            mensaje.setFechaHora(LocalDateTime.now());
            mensaje.setEstadoLectura(estadoEnviado);

            Mensaje mensajeGuardado = mensajeRepository.save(mensaje);
            System.out.println("✅ SERVICIO: Mensaje guardado en BD con ID: " + mensajeGuardado.getId());

            chat.setUltimoMensaje(mensajeGuardado);
            chatRepository.save(chat);

            MensajeDTO resultado = convertirADTO(mensajeGuardado);
            resultado.setAutorNombre(autor.getNombres() + " " + autor.getApellidos());

            return resultado;

        } catch (PermissionDeniedException | ChatException e) {
            System.err.println("SERVICIO: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            System.err.println("SERVICIO: Error inesperado al guardar mensaje: " + e.getMessage());
            throw new ChatException("Error interno al guardar mensaje", "INTERNAL_ERROR");
        }
    }

    @Transactional(readOnly = true)
    public List<Usuario> getParticipantes(Integer chatId) {
        List<ParticipanteChat> participantes = participanteChatRepository.findByChat_Id(chatId);
        return participantes.stream()
                .map(ParticipanteChat::getUsuario)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public boolean verificarParticipante(Integer chatId, Integer usuarioId) {
        List<ParticipanteChat> participantes = participanteChatRepository.findByChat_Id(chatId);
        return participantes.stream()
                .anyMatch(p -> p.getUsuario().getId().equals(usuarioId));
    }

    @Transactional
    public void marcarMensajeComoLeido(Integer mensajeId, Long usuarioId) {
        EstadosLectura estadoLeido = estadosLecturaRepository.findByTipoIgnoreCase("leído");

        Mensaje mensaje = mensajeRepository.findById(mensajeId).orElseThrow();
        mensaje.setEstadoLectura(estadoLeido);
        mensajeRepository.save(mensaje);
    }

    @Transactional(readOnly = true)
    public Integer getAutorMensaje(Integer mensajeId) {
        return mensajeRepository.findById(mensajeId)
                .map(mensaje -> mensaje.getAutor().getId())
                .orElseThrow();
    }

    private MensajeDTO convertirADTO(Mensaje mensaje) {
        MensajeDTO dto = new MensajeDTO();
        dto.setId(mensaje.getId());
        dto.setChatId(mensaje.getChat().getId());
        dto.setAutorId(mensaje.getAutor().getId());
        dto.setContenido(mensaje.getContenido());
        dto.setFechaHora(mensaje.getFechaHora());
        dto.setEstadoLecturaId(mensaje.getEstadoLectura().getId());
        dto.setAutorNombre(mensaje.getAutor().getNombres());
        return dto;
    }

    @Transactional
    public ChatDTO crearChat(CrearChatDTO crearChatDTO) {
        validarCrearChatDTO(crearChatDTO);

        try {
            List<Integer> participantesIds = crearChatDTO.getParticipantesIds();

            for (Integer usuarioId : participantesIds) {
                Usuario usuario = usuarioRepository.findById(usuarioId)
                        .orElseThrow(() -> new ChatException("Usuario con ID " + usuarioId + " no existe", "USER_NOT_FOUND"));

                if (!usuario.isEstadoActivo()) {
                    throw new ChatException("Usuario con ID " + usuarioId + " no está activo", "USER_INACTIVE");
                }
            }

            if (participantesIds.get(0).equals(participantesIds.get(1))) {
                throw new ChatException("No puedes crear un chat contigo mismo", "INVALID_PARTICIPANTS");
            }

            Optional<Chat> chatExistente = buscarChatEntreUsuarios(participantesIds.get(0), participantesIds.get(1));
            if (chatExistente.isPresent()) {
                System.out.println("✅ SERVICIO: Chat existente encontrado con ID: " + chatExistente.get().getId());
                return convertirChatADTO(chatExistente.get());
            }

            EstadosConversacion estadoActivo = estadosConversacionRepository.findByTipoIgnoreCase("activo");
            if (estadoActivo == null) {
                throw new ChatException("Configuración de estados incorrecta", "CONFIG_ERROR");
            }

            Chat nuevoChat = new Chat();
            nuevoChat.setEstado(estadoActivo);
            Chat chatGuardado = chatRepository.save(nuevoChat);

            for (Integer usuarioId : participantesIds) {
                ParticipanteChat participante = new ParticipanteChat();
                participante.setChat(chatGuardado);
                participante.setUsuario(usuarioRepository.findById(usuarioId).get());
                participanteChatRepository.save(participante);
            }

            System.out.println("SERVICIO: Nuevo chat creado con ID: " + chatGuardado.getId());
            return convertirChatADTO(chatGuardado);

        } catch (ChatException e) {
            System.err.println("SERVICIO: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            System.err.println("SERVICIO: Error inesperado al crear chat: " + e.getMessage());
            throw new ChatException("Error interno al crear chat", "INTERNAL_ERROR");
        }
    }

    @Transactional(readOnly = true)
    public List<ChatDTO> obtenerChatsDeUsuario(Integer usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ChatException("Usuario no encontrado", "USER_NOT_FOUND");
        }

        try {
            List<ParticipanteChat> participaciones = participanteChatRepository.findByUsuario_Id(usuarioId);
            return participaciones.stream()
                    .filter(p -> "activo".equalsIgnoreCase(p.getChat().getEstado().getTipo())) // Solo chats activos
                    .map(p -> convertirChatADTO(p.getChat()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("❌ SERVICIO: Error al obtener chats del usuario: " + e.getMessage());
            throw new ChatException("Error al obtener chats", "INTERNAL_ERROR");
        }
    }

    @Transactional(readOnly = true)
    public Page<MensajeDTO> obtenerMensajesDeChat(Integer chatId, Pageable pageable) {
        if (!chatRepository.existsById(chatId)) {
            throw new ChatException("Chat no encontrado", "CHAT_NOT_FOUND");
        }

        try {
            Page<Mensaje> mensajes = mensajeRepository.findByChat_IdOrderByFechaHoraDesc(chatId, pageable);
            return mensajes.map(this::convertirADTO);
        } catch (Exception e) {
            System.err.println("SERVICIO: Error al obtener mensajes: " + e.getMessage());
            throw new ChatException("Error al obtener mensajes", "INTERNAL_ERROR");
        }
    }

    @Transactional(readOnly = true)
    public ChatDTO obtenerChatPorId(Integer chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado"));
        return convertirChatADTO(chat);
    }

    @Transactional
    public ChatDTO buscarOCrearChatEntreUsuarios(Integer usuario1Id, Integer usuario2Id) {
        Optional<Chat> chatExistente = buscarChatEntreUsuarios(usuario1Id, usuario2Id);

        if (chatExistente.isPresent()) {
            return convertirChatADTO(chatExistente.get());
        }

        CrearChatDTO crearChatDTO = new CrearChatDTO();
        crearChatDTO.setParticipantesIds(List.of(usuario1Id, usuario2Id));
        crearChatDTO.setTipoChat("privado");

        return crearChat(crearChatDTO);
    }

    private Optional<Chat> buscarChatEntreUsuarios(Integer usuario1Id, Integer usuario2Id) {
        List<ParticipanteChat> participacionesUsuario1 = participanteChatRepository.findByUsuario_Id(usuario1Id);

        for (ParticipanteChat participacion : participacionesUsuario1) {
            List<ParticipanteChat> participantesDelChat = participanteChatRepository.findByChat_Id(participacion.getChat().getId());

            if (participantesDelChat.size() == 2) {
                boolean tieneUsuario2 = participantesDelChat.stream()
                        .anyMatch(p -> p.getUsuario().getId().equals(usuario2Id));
                if (tieneUsuario2) {
                    return Optional.of(participacion.getChat());
                }
            }
        }
        return Optional.empty();
    }

    private ChatDTO convertirChatADTO(Chat chat) {
        ChatDTO dto = new ChatDTO();
        dto.setId(chat.getId().longValue());
        dto.setEstadoId(chat.getEstado().getId().longValue());

        if (chat.getUltimoMensaje() != null) {
            dto.setUltimoMensajeId(chat.getUltimoMensaje().getId().longValue());
            dto.setUltimoMensajeContenido(chat.getUltimoMensaje().getContenido());
            dto.setUltimoMensajeFecha(chat.getUltimoMensaje().getFechaHora());
        }

        return dto;
    }

    private void validarMensajeDTO(MensajeDTO mensajeDTO) {
        if (mensajeDTO.getChatId() == null || mensajeDTO.getChatId() <= 0) {
            throw new IllegalArgumentException("ID del chat inválido");
        }
        if (mensajeDTO.getAutorId() == null || mensajeDTO.getAutorId() <= 0) {
            throw new IllegalArgumentException("ID del autor inválido");
        }
        if (mensajeDTO.getContenido() == null || mensajeDTO.getContenido().trim().isEmpty()) {
            throw new IllegalArgumentException("El contenido del mensaje no puede estar vacío");
        }
        if (mensajeDTO.getContenido().length() > 2000) {
            throw new IllegalArgumentException("El mensaje no puede exceder 2000 caracteres");
        }
    }

    private void validarCrearChatDTO(CrearChatDTO crearChatDTO) {
        if (crearChatDTO.getParticipantesIds() == null || crearChatDTO.getParticipantesIds().isEmpty()) {
            throw new IllegalArgumentException("La lista de participantes no puede estar vacía");
        }
        if (crearChatDTO.getParticipantesIds().size() != 2) {
            throw new IllegalArgumentException("Los chats privados deben tener exactamente 2 participantes");
        }
        for (Integer id : crearChatDTO.getParticipantesIds()) {
            if (id == null || id <= 0) {
                throw new IllegalArgumentException("IDs de participantes inválidos");
            }
        }
    }
}