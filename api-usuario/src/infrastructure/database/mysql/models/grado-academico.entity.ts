import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DomainGradoAcademico } from "../../../../domain/entities/grado-academico";
import { Usuario } from "./usuario.entity";

@Entity()
export class GradoAcademico extends DomainGradoAcademico{

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
