import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DomainPublicacion } from "../../../../domain/entities/Publicacion";

@Entity()
export class Publicacion extends DomainPublicacion {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: false })
  base_datos_bibliografica: string;

  @Column({ type: 'text', nullable: false })
  revista: string;

  @Column({ type: 'int', nullable: false })
  anio_publicacion: number;

  @Column({ type: 'text', nullable: false })
  url_publicacion: string;
}