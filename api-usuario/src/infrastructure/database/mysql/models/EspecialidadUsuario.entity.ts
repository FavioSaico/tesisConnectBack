import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DomainEspecialidadUsuario } from "../../../../domain/entities/EspecialidadUsuario";
import { Usuario } from "./usuario.entity";
import { Especialidad } from "./Especialidad.entity";



@Entity()
export class EspecialidadUsuario extends DomainEspecialidadUsuario {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  id_usuario: number;

  @Column({ type: 'int', nullable: false })
  id_especialidad: number;

  @Column({ type: 'int', nullable: false })
  anios_experiencia: number;

  @ManyToOne(
    () => Especialidad, 
    (especialidad) => especialidad.especialidades_usuario, 
    { onDelete: 'CASCADE', cascade: true, eager: true }
  )
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidad;

  @ManyToOne(
    () => Usuario, 
    (usuario) => usuario.especialidades_usuario, 
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}