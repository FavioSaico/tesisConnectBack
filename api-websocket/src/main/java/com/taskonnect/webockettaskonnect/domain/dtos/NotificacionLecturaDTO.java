package com.taskonnect.webockettaskonnect.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificacionLecturaDTO {
    private Integer mensajeId;
    private Integer chatId;
    private Long usuarioId;
}
