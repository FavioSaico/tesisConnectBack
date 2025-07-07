package com.taskonnect.webockettaskonnect.infrastructure.repositories;

import com.taskonnect.webockettaskonnect.domain.entities.Mensaje;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {
    Page<Mensaje> findByChat_IdOrderByFechaHoraDesc(Integer chatId, Pageable pageable);
}
