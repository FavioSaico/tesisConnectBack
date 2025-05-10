import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { DomainUsuario } from "../../../../domain/entities/usuario";
import { GradoAcademico } from './GradoAcademico.entity';
import { EspecialidadUsuario } from './EspecialidadUsuario.entity';


@Entity()
export class Usuario extends DomainUsuario {

  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number; // Cambié el tipo a "string" porque 'bigint' es comúnmente tratado como string en TypeORM

  @Column({
    type: 'int'
  })
  id_grado_academico: number;

  @Column({
    type: 'tinyint',
    default: 1
  })
  estado_activo: boolean; // Se ajusta al tipo tinyint(1), por lo general 0 es false, 1 es true

  @Column({
    type: 'varchar',
    length: 100,
    default: 'inactivo' // Se ajusta para coincidir con el valor predeterminado de 'inactivo'
  })
  estado_cuenta: string; // No necesita cambiar el tipo ya que 'varchar(100)' es adecuado

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
  nombre_completo: string; // Cambié 'nombre' por 'nombre_completo'

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  apellido_completo: string; // Cambié 'apellido' por 'apellido_completo'

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  correo_institucional: string; // Cambié 'correo' por 'correo_institucional'

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  contrasenia: string; // Cambié 'contrasenia' por 'contrasena'

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
  linea_investigacion: string; // Añadí el campo 'linea_investigacion' para que coincida con la tabla

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
}