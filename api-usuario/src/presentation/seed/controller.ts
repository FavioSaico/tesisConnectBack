import { AppDataSource, GradoAcademico, Especialidad, CarreraProfesional } from "../../infrastructure/database/mysql";
import { Request, Response } from "express"
import { GRADOACADEMICO_SEED } from "../../infrastructure/database/seed/data/grado-academico.seed";
import { ESPECIALIDADES_SEED } from "../../infrastructure/database/seed/data/Especialidad.seed";
import { CARRERAS_PROFESIONALES_SEED } from "../../infrastructure/database/seed/data/CarreraProfesional.seed";
import { UNIVERSIDAD_SEED } from "../../infrastructure/database/seed/data/Universidad.seed";
import { Universidad } from "../../infrastructure/database/mysql/models/Universidad.entity";

export class SeedController {

  registerGradoAcademico = async (req: Request, res: Response): Promise<any> => {

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
      const gradosAcademicos = GRADOACADEMICO_SEED;

      const insertPromises: Promise<any>[] = [];

      gradosAcademicos.forEach(async (gradoAcademico) => {
        const grado = gradoAcademicoRepository.create(gradoAcademico)
        // el create por defecto creará en base de datos
        insertPromises.push(gradoAcademicoRepository.save(grado));
      });


      // vamos a resolver todas las promesas
      return Promise.all(insertPromises)
        .then(
          data => res.json(data)
        );

      // return res.json(true);

    } catch (error) {
      throw error
    }
  };

  registerEspecialidades = async (req: Request, res: Response): Promise<any> => {
    const especialidadRepository = AppDataSource.getRepository(Especialidad);
    const query = especialidadRepository.createQueryBuilder('especialidad');

    try {
      await query.delete().where({}).execute();

      const especialidades = ESPECIALIDADES_SEED;
      const insertPromises: Promise<any>[] = [];

      for (const especialidad of especialidades) {
        if (!especialidad.nombre) {
          throw new Error("El nombre de la especialidad no puede ser nulo o vacío");
        }

        const record = especialidadRepository.create(especialidad);
        insertPromises.push(especialidadRepository.save(record));
      }

      const data = await Promise.all(insertPromises);
      return res.json(data);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

  registerCarrerasProfesionales = async (req: Request, res: Response): Promise<any> => {
    const carreraProfesionalRepository = AppDataSource.getRepository(CarreraProfesional);
    const query = carreraProfesionalRepository.createQueryBuilder("carrera_profesional");

    try {
      // Eliminamos todos los registros existentes
      await query.delete().where({}).execute();

      // Insertamos los nuevos registros
      const carreras = CARRERAS_PROFESIONALES_SEED;
      const insertPromises: Promise<any>[] = [];

      for (const carrera of carreras) {
        const record = carreraProfesionalRepository.create(carrera);
        insertPromises.push(carreraProfesionalRepository.save(record));
      }

      const data = await Promise.all(insertPromises);
      return res.json(data);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

  registerUniversidades = async (req: Request, res: Response): Promise<any> => {
    const universidadRepository = AppDataSource.getRepository(Universidad);
    const query = universidadRepository.createQueryBuilder("universidad");

    try {
      // Eliminamos todos los registros existentes
      await query.delete().where({}).execute();

      // Insertamos los nuevos registros desde el seed
      const universidades = UNIVERSIDAD_SEED;
      const insertPromises: Promise<any>[] = [];

      for (const universidad of universidades) {
        if (!universidad.nombre) {
          throw new Error("El nombre de la universidad no puede ser nulo o vacío");
        }

        const record = universidadRepository.create(universidad);
        insertPromises.push(universidadRepository.save(record));
      }

      const data = await Promise.all(insertPromises);
      return res.json(data);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };



}