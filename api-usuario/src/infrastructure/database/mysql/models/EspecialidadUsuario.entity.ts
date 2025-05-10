import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DomainEspecialidadUsuario } from "../../../../domain/entities/EspecialidadUsuario";

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
}