import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DomainUsuario } from "../../../../domain/entities/usuario";

@Entity()
export class Usuario extends DomainUsuario{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  email: string;


  toDomain(): DomainUsuario {
    return new DomainUsuario(this.id, this.name, this.email);
  }

  static fromDomain(user: DomainUsuario): Usuario {
    const entityUsuario = new Usuario(
      user.id,
      user.name,
      user.email
    );
    
    return entityUsuario;
  }

}