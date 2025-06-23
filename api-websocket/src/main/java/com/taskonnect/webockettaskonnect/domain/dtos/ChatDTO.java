package com.taskonnect.webockettaskonnect.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {
    private Long id;
    private Long estadoId;
    private Long ultimoMensajeId;
    private String ultimoMensajeContenido;
    private LocalDateTime ultimoMensajeFecha;
}
