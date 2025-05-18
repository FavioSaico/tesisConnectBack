import { Request, Response } from "express"
import { plainToInstance } from "class-transformer";
import { CustomError, RequestAdviceDto} from "../../domain";
import { SolicitarAsesoria } from "../../application/use-cases/relaciones/solicitar-asesoria.use-case";
import { RelationesRepository } from "../../domain/repositories/relationes.repository";

export class RelationsController {

    constructor(
      private readonly relacionesRepostory: RelationesRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    sendNotificationByEmail = async (req: Request, res: Response): Promise<any> => {

      // try {

        const requestAdviceDto = plainToInstance(RequestAdviceDto, req.body);

        new SolicitarAsesoria(this.relacionesRepostory)
          .execute(requestAdviceDto)
          .then(data => res.json(data))
          .catch(error => this.handleError(error, res));

        // return res.json({requestAdviceDto})

        // const pubsub = new PubSub();

        // const topicName = 'projects/metal-node-424103-e4/topics/tesisconnect-notificaciones';
        // const mensaje = {
        //   type : "solicitudEnviada",
        //   data: {
        //     destinatario: {
        //       id: requestAdviceDto.receptor.id,
        //       nombre: requestAdviceDto.receptor.nombre,
        //       correo: requestAdviceDto.receptor.correo
        //     },
        //     remitente: {
        //       id: requestAdviceDto.remitente.id,
        //       nombre: requestAdviceDto.remitente.nombre,
        //       correo: requestAdviceDto.remitente.correo
        //     },
        //     tituloProyecto: requestAdviceDto.tituloProyecto,
        //     areaInvestigacion: requestAdviceDto.areaInvestigacion,
        //     universidad: "Universidad Nacional Mayor de San Marcos"
        //   }
        // };

        // const dataBuffer = Buffer.from(JSON.stringify(mensaje));

        // const messageId = await pubsub.topic(topicName).publishMessage({ data: dataBuffer });

        // return res.json({messageId})

      // } catch (error) {

      //   return this.handleError(error, res)

      // }
      


    };

}