import { CustomError, RequestAdviceDto, UsuarioNotificacionDto } from "../../domain";
import { RelationesDatasource } from "../../domain/datasources/relationes.datasource";
import { AppDataSource, Usuario } from "../database/mysql";
import { PubSub } from "@google-cloud/pubsub";

export class RelationesDatasourceImpl implements RelationesDatasource {

  constructor(
      private usuarioRepository = AppDataSource.getRepository(Usuario),
  ) {

  }

  async solicitarAsesoria(solicitarAsesoriaDto: RequestAdviceDto): Promise<any> {
    const { remitenteId, destinatarioId, tituloProyecto, areaInvestigacion } = solicitarAsesoriaDto;

    try {
      const usuarioRemitente = await this.usuarioRepository.findOneBy({ id: +remitenteId });
      if (!usuarioRemitente) throw CustomError.badRequest('Usuario remitente no encontrado');

      const usuarioDestinatario = await this.usuarioRepository.findOneBy({ id: +destinatarioId });
      if (!usuarioDestinatario) throw CustomError.badRequest('Usuario destinatario no encontrado');

      const remitente = new UsuarioNotificacionDto();
      remitente.id = usuarioRemitente.id.toString();
      remitente.correo = usuarioRemitente.correo;
      remitente.nombre = usuarioRemitente.nombres + " " + usuarioRemitente.apellidos;

      const destinatario = new UsuarioNotificacionDto();
      destinatario.id = usuarioDestinatario.id.toString();
      destinatario.correo = usuarioDestinatario.correo;
      destinatario.nombre = usuarioDestinatario.nombres + " " + usuarioDestinatario.apellidos;

      await this.publicarEventoNotificacion(remitente, destinatario, tituloProyecto, areaInvestigacion);

      return {
        message: "Notificación enviada"
      };
      
    } catch (error) {
        if (error instanceof CustomError) throw error;
        throw CustomError.internalServer();
    }

  }

  async publicarEventoNotificacion( remitente: UsuarioNotificacionDto, destinatario: UsuarioNotificacionDto, proyecto: string, area: string ) {
    const pubsub = new PubSub();

    const topicName = 'projects/metal-node-424103-e4/topics/tesisconnect-notificaciones';
    const mensaje = {
      type : "solicitudEnviada",
      data: {
        destinatario: {
          id: destinatario.id,
          nombre: destinatario.nombre,
          correo: destinatario.correo
        },
        remitente: {
          id: remitente.id,
          nombre: remitente.nombre,
          correo: remitente.correo
        },
        tituloProyecto: proyecto,
        areaInvestigacion: area,
        universidad: "Universidad Nacional Mayor de San Marcos"
      }
    };

    const dataBuffer = Buffer.from(JSON.stringify(mensaje));

    await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
  }

}