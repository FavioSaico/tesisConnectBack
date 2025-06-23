package com.taskonnect.webockettaskonnect.domain.dtos;

import java.util.List;

public class CrearChatDTO {
    private List<Integer> participantesIds;
    private String tipoChat;

    public List<Integer> getParticipantesIds() {
        return participantesIds;
    }

    public void setParticipantesIds(List<Integer> participantesIds) {
        this.participantesIds = participantesIds;
    }

    public String getTipoChat() {
        return tipoChat;
    }

    public void setTipoChat(String tipoChat) {
        this.tipoChat = tipoChat;
    }

    public CrearChatDTO() {
    }

    public CrearChatDTO(List<Integer> participantesIds, String tipoChat) {
        this.participantesIds = participantesIds;
        this.tipoChat = tipoChat;
    }
}