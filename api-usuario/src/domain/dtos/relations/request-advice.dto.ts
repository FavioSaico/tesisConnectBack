import { IsNotEmpty, IsString } from "class-validator";


export class UsuarioNotificacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El id es requerido.' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El correo es requerido.' })
  correo: string;
}

export class RequestAdviceDto {

  @IsString()
  @IsNotEmpty({ message: 'El id es requerido.' })
  remitenteId: string;

  @IsString()
  @IsNotEmpty({ message: 'El id es requerido.' })
  destinatarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'El titulo de proyecto es necesario.' })
  tituloProyecto: string;

  @IsString()
  @IsNotEmpty({ message: 'El área de investigación es necesario.' })
  areaInvestigacion: string;

}
