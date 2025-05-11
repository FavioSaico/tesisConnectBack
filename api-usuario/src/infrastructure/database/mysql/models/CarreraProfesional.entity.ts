import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DomainCarreraProfesional } from "../../../../domain/entities/CarreraProfesional";
import { Usuario } from "./usuario.entity";

@Entity()
export class CarreraProfesional extends DomainCarreraProfesional {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  nombre: string;

  @OneToMany(
    () => Usuario,
    (usuario) => usuario.id, // Aquí debes referenciar el campo en Usuario que está relacionado con CarreraProfesional
    { onDelete: 'CASCADE' }
  )
  usuarios: Usuario[]; // Debe ser un arreglo, ya que puede haber múltiples usuarios en una carrera profesional
}