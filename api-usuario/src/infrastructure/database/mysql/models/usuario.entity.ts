import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { DomainUsuario } from "../../../../domain/entities/usuario";
import { GradoAcademico } from './GradoAcademico.entity';
import { EspecialidadUsuario } from './EspecialidadUsuario.entity';
import { CarreraProfesional } from './CarreraProfesional.entity';  // Asegúrate de importar CarreraProfesional

@Entity()
export class Usuario extends DomainUsuario {

  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({
    type: 'int'
  })
  id_grado_academico: number;

  @Column({
    type: 'int'
  })
  id_carrera_profesional: number;

  @Column({
    type: 'tinyint',
    default: 1
  })
  estado_activo: boolean;

  @Column({
    type: 'varchar',
    length: 100,
    default: 'inactivo'
  })
  estado_cuenta: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true
  })
  orcid?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  nombres: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  apellidos: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  correo: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  contrasena: string;

  @Column({
    type: 'text',
    nullable: false
  })
  descripcion: string;

  @Column({
    type: 'tinyint',
    default: false
  })
  rol_tesista: boolean;

  @Column({
    type: 'tinyint',
    default: false
  })
  rol_asesor: boolean;

  @Column({
    type: 'tinyint',
    default: false
  })
  rol_colaborador: boolean;

  @CreateDateColumn()
  fecha_registro: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  @Column({
    type: 'text',
    nullable: true
  })
  linea_investigacion: string;

  // RELACIONA DE UNO A MUCHOS
  @ManyToOne(
    () => GradoAcademico,
    (gradoAcademico) => gradoAcademico.id,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_grado_academico' })
  grado_academico: GradoAcademico;

  @OneToMany(() => EspecialidadUsuario, (especialidadUsuario) => especialidadUsuario.usuario)
  especialidades_usuario: EspecialidadUsuario[];

  // Relación ManyToOne con CarreraProfesional
  @ManyToOne(
    () => CarreraProfesional,
    (carreraProfesional) => carreraProfesional.id, // Referencia a la propiedad 'usuarios' en CarreraProfesional
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_carrera_profesional' }) 
  carrera_profesional: CarreraProfesional;

}