import { get } from "env-var";

export const envs = {
    NODE_ENV: get('NODE_ENV').required().asString(),
    PORT: get('PORT').required().asPortNumber(),
    MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber(),
    MYSQL_HOST: get('MYSQL_HOST').required().asString(),
    MYSQL_USER: get('MYSQL_USER').required().asString(),
    MYSQL_DB_NAME: get('MYSQL_DB_NAME').required().asString(),
    MYSQL_PASS: get('MYSQL_PASS').required().asString(),
    MYSQL_INSTANCE_CLOUD: get('MYSQL_INSTANCE_CLOUD').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString() // semilla de los JWT que generamos
}