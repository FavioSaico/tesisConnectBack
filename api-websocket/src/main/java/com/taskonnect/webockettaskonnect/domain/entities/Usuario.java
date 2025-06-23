package com.taskonnect.webockettaskonnect.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int idGradoAcademico;
    private int idCarreraProfesional;
    private boolean estadoActivo = true;
    private String estadoCuenta = "inactivo";
    private String orcid;
    private String nombres;
    private String apellidos;

    @Column(unique = true)
    private String correo;

    private String contrasena;
    private String descripcion;
    private boolean rolTesista = false;
    private boolean rolAsesor = false;
    private boolean rolColaborador = false;

    @Column(name = "fecha_registro", updatable = false)
    @CreationTimestamp
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_actualizacion")
    @UpdateTimestamp
    private LocalDateTime fechaActualizacion;

    private String lineaInvestigacion;
}
