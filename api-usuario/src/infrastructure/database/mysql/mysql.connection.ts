import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./models/usuario.entity"
import { envs } from "../../../config/envs";
import { GradoAcademico } from './models/grado-academico.entity';
import { Especialidad } from "./models/Especialidad.entity";


const isProduction = envs.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: isProduction ? undefined : envs.MYSQL_HOST,
    port: isProduction ? undefined : envs.MYSQL_PORT,
    username: envs.MYSQL_USER,
    password: envs.MYSQL_PASS,
    database: envs.MYSQL_DB_NAME,
    synchronize: isProduction ? false : true,
    logging: false,
    entities: [Usuario, GradoAcademico,Especialidad],
    migrations: [],
    subscribers: [],
    ...(isProduction && {
      socketPath: `/cloudsql/${envs.MYSQL_INSTANCE_CLOUD}`,
    }),
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