package com.taskonnect.webockettaskonnect.domain.dtos;

import java.time.LocalDateTime;

public class MensajeDTO {
    private Integer id;
    private Integer chatId;
    private Integer autorId;
    private String contenido;
    private LocalDateTime fechaHora;
    private Integer estadoLecturaId;
    private String autorNombre;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
    }

    public Integer getAutorId() {
        return autorId;
    }

    public void setAutorId(Integer autorId) {
        this.autorId = autorId;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public Integer getEstadoLecturaId() {
        return estadoLecturaId;
    }

    public void setEstadoLecturaId(Integer estadoLecturaId) {
        this.estadoLecturaId = estadoLecturaId;
    }

    public String getAutorNombre() {
        return autorNombre;
    }

    public void setAutorNombre(String autorNombre) {
        this.autorNombre = autorNombre;
    }

    public MensajeDTO() {
    }

    public MensajeDTO(Integer id, Integer chatId, Integer autorId, String contenido, LocalDateTime fechaHora, Integer estadoLecturaId, String autorNombre) {
        this.id = id;
        this.chatId = chatId;
        this.autorId = autorId;
        this.contenido = contenido;
        this.fechaHora = fechaHora;
        this.estadoLecturaId = estadoLecturaId;
        this.autorNombre = autorNombre;
    }
}
