import { get } from 'env-var';
import * as dotenv from 'dotenv';

// Cargar variables del archivo .env
dotenv.config();

export const envs = {
  //NODE_ENV: get('NODE_ENV').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
  MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber(),
  MYSQL_HOST: get('MYSQL_HOST').required().asString(),
  MYSQL_USER: get('MYSQL_USER').required().asString(),
  MYSQL_DB_NAME: get('MYSQL_DB_NAME').required().asString(),
  MYSQL_PASS: get('MYSQL_PASS').required().asString(),
  MYSQL_INSTANCE_CLOUD: get('MYSQL_INSTANCE_CLOUD').asString() || '', // No lo marcamos como required por si es local
  JWT_SEED: get('JWT_SEED').required().asString(),
  API_MODE: get('API_MODE').required().asString()
};