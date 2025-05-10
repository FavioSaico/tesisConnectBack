import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DomainUsuario } from "../../../../domain/entities/usuario";
import { GradoAcademico } from './grado-academico.entity';

@Entity()
export class Usuario extends DomainUsuario {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  id_grado_academico: number;

  @Column({ type: 'boolean', default: true })
  estado_activo?: boolean;

  @Column({
    type: 'enum',
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'inactivo'
  })
  estado_cuenta: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  orcid?: string;

  @Column({ name: 'nombre_completo', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'apellido_completo', type: 'varchar', length: 100 })
  apellido: string;

  @Column({ name: 'correo_institucional', type: 'varchar', length: 100, unique: true })
  correo: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 100 })
  contrasenia: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ name: 'linea_investigacion', type: 'text' })
  lineaInvestigacion: string;

  @Column({ type: 'boolean', default: false })
  rol_tesista: boolean;

  @Column({ type: 'boolean', default: false })
  rol_asesor: boolean;

  @Column({ type: 'boolean', default: false })
  rol_colaborador: boolean;

  @CreateDateColumn({ name: 'fecha_registro' })
  fecha_registro: Date;

  @UpdateDateColumn({ name: 'fecha_update' })
  fecha_actualizacion: Date;

  @ManyToOne(
    () => GradoAcademico,
    (gradoAcademico) => gradoAcademico.id,
    { cascade: false, eager: true }
  )
  @JoinColumn({ name: 'id_grado_academico' })
  grado_academico: GradoAcademico;
}