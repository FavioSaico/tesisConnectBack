import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./models/usuario.entity"
import { envs } from "../../../config/envs";
import { GradoAcademico } from './models/grado-academico.entity';
import { Especialidad } from "./models/Especialidad.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: envs.MYSQL_PORT,
    username: envs.MYSQL_USER,
    password: envs.MYSQL_PASS,
    database: envs.MYSQL_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Usuario, GradoAcademico,Especialidad],
    migrations: [],
    subscribers: [],
});


export async function initDatabase(): Promise<void> {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connected');
    }
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1); // o maneja errores según tu necesidad
  }
}