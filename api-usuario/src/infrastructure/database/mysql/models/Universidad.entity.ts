import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DomainUniversidad } from "../../../../domain/entities/Universidad";
import { Usuario } from "./usuario.entity";

@Entity()
export class Universidad extends DomainUniversidad{

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  nombre: string

  @OneToMany(
    () => Usuario,
    ( usuario ) => usuario.id,
    {  onDelete: 'CASCADE' }
  )
  usuario: Usuario

}
