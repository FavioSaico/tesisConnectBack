package com.taskonnect.webockettaskonnect.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estados_conversacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadosConversacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tipo;
}

