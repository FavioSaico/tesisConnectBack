package com.taskonnect.webockettaskonnect.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estados_lectura")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadosLectura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tipo;
}
