package com.taskonnect.webockettaskonnect.infrastructure.repositories;

import com.taskonnect.webockettaskonnect.domain.entities.EstadosLectura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadosLecturaRepository extends JpaRepository<EstadosLectura, Integer> {
    EstadosLectura findByTipoIgnoreCase(String tipo);
}
