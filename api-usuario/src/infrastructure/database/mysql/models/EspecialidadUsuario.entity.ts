import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DomainEspecialidadUsuario } from "../../../../domain/entities/EspecialidadUsuario";
import { Usuario } from "./usuario.entity";

@Entity()
export class EspecialidadUsuario extends DomainEspecialidadUsuario{

  @Column({
    type: 'number',
    nullable: false
  })
  id : number

  @Column({
    type: 'number',
    nullable: false
  })
  id_usuario : number

  @Column({
    type: 'number',
    nullable: false
  })
  id_especialidad : number
  
  @Column({
    type: 'varchar',
    length: 1000,
    nullable: false
  })
  nombre_especialidad: string

 /* @OneToMany(
    () => Usuario,
    ( usuario ) => usuario.id,
    {  onDelete: 'CASCADE' }
  )
  usuario: Usuario
  static id: any;*/

}
