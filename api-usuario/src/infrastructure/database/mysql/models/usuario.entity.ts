import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DomainUsuario } from "../../../../domain/entities/usuario";

@Entity()
export class Usuario extends DomainUsuario{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int'
  })
  id_grado_academico: number

  // por defecto siempre activo
  // para manejar la eliminación
  @Column({
    type: 'boolean',
    default: true
  })
  estado_activo?: boolean

  // activo dentro de la plataforma
  @Column({
    type: 'enum',
    enum: ['activo','inactivo', 'suspendido'],
    default: 'inactivo'
  })
  estado_cuenta: string;

  @Column({
    type: 'varchar',
    nullable: true // puede aceptar nulos
  })
  orcid?: string

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  nombre: string

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  apellido: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true // debe ser única
  })
  correo: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  contrasenia: string

  @Column({
    type: 'text',
    nullable: false
  })
  descripcion: string

  @Column({
    type: 'boolean',
    default: false
  })
  rol_tesista: boolean

  @Column({
    type: 'boolean',
    default: false
  })
  rol_asesor: boolean

  @Column({
    type: 'boolean',
    default: false
  })
  rol_colaborador: boolean

  @CreateDateColumn()
  fecha_registro: Date

  @UpdateDateColumn()
  fecha_actualizacion: Date

  // RELACIONA DE UNO A MUCHOS

  // Entidad Productos
  // Definimos un campo para la relación de 1 a muchos
  // una marca tiene muchos productos
  // @ManyToOne(
  //   () => Brand,
  //   (Brand) => Brand.id,
  //   { cascade: false, eager: true }
  // )
  // @JoinColumn({ name: 'id_brand' })
  // brand: Brand;

  // Entidad Marca
  // @OneToMany(
  //   () => Product,
  //   ( product ) => product.id,
  //   {  onDelete: 'CASCADE' }
  // )
  // product: Product

}