import { AppDataSource, GradoAcademico } from "../../infrastructure/database/mysql";
import { Request, Response } from "express"
import { GRADOACADEMICO_SEED } from "../../infrastructure/database/seed/data/grado-academico.seed";

export class SeedController{
  
  registerGradoAcademico = async (req: Request, res:Response): Promise<any> => {

    // eliminamos todos los grados
    const gradoAcademicoRepository = AppDataSource.getRepository(GradoAcademico)
    const query = gradoAcademicoRepository.createQueryBuilder('grado_academico');

    try {
      // eliminamos todos los datos
      await query
        .delete() // elimina
        .where({}) // selecciona todos los registros
        .execute();

      // Obtenemos los datos a insertar
      const gradosAcademicos= GRADOACADEMICO_SEED;

      const insertPromises: Promise<any>[] = [];

      gradosAcademicos.forEach( async (gradoAcademico) => {
        const grado = gradoAcademicoRepository.create(gradoAcademico)
        // el create por defecto creará en base de datos
        insertPromises.push( gradoAcademicoRepository.save( grado ));
      });


      // vamos a resolver todas las promesas
      return Promise.all( insertPromises )
        .then(
          data => res.json(data)
        );

      // return res.json(true);

    } catch (error) {
      throw error
    }
  }

}