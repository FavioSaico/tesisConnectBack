import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DomainEspecialidad } from "../../../../domain/entities/Especialidad";
import { EspecialidadUsuario } from './EspecialidadUsuario.entity';

@Entity()
export class Especialidad extends DomainEspecialidad {
  static find() {
    throw new Error('Method not implemented.');
  }

  @PrimaryGeneratedColumn() // Agregar columna primaria
  id: number;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: false
  })
  nombre: string;
  
  @OneToMany(() => EspecialidadUsuario, (especialidadUsuario) => especialidadUsuario.especialidad)
  especialidades_usuario: EspecialidadUsuario[];
}