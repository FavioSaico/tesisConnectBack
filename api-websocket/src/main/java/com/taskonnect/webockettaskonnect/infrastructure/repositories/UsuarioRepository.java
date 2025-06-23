package com.taskonnect.webockettaskonnect.infrastructure.repositories;

import com.taskonnect.webockettaskonnect.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
}
