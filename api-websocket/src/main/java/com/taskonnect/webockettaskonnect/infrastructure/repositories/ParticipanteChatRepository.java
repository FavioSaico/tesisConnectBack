package com.taskonnect.webockettaskonnect.infrastructure.repositories;

import com.taskonnect.webockettaskonnect.domain.entities.ParticipanteChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipanteChatRepository extends JpaRepository<ParticipanteChat, Integer> {
    List<ParticipanteChat> findByChat_Id(Integer id);
    List<ParticipanteChat> findByUsuario_Id(Integer usuarioId);
}
