package com.taskonnect.webockettaskonnect.infrastructure.repositories;

import com.taskonnect.webockettaskonnect.domain.entities.EstadosConversacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadosConversacionRepository extends JpaRepository<EstadosConversacion, Integer> {
    EstadosConversacion findByTipoIgnoreCase(String tipo);
}
