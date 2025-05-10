import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DomainPublicacionUsuario } from "../../../../domain/entities/PublicacionUsuario";
import { Publicacion } from "./Publicacion.entity"; 

@Entity()
export class PublicacionUsuario extends DomainPublicacionUsuario {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  id_usuario: number;

  @Column({ type: 'bigint', nullable: false })
  id_publicacion: number;

  @ManyToOne(() => Publicacion)
  @JoinColumn({ name: 'id_publicacion' }) // Importante para que sepa qué columna es la FK
  publicacion: Publicacion;
}