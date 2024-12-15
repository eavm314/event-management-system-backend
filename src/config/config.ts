import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.ENV_PORT || 3000,
  environment: process.env.ENV || 'develop'
};

export const db = {
  port: Number(process.env.BD_PORT) || 3306,
  type: process.env.BD_TYPE as "mysql" || 'mysql',
  username: process.env.BD_USER || 'root',
  password: process.env.BD_PASS || 'root',
  host: process.env.BD_HOST || 'localhost',
  database: process.env.BD_NAME || 'event_registration_system_db',
}

export const auth = {
  saltRounds: Number(process.env.PW_SALT_ROUNDS) || 10,
  jwtSecret: process.env.JWT_SECRET || "my_secret",
  jwtExpTime: process.env.JWT_EXP_TIME || "1h",
}

export const files = {
  storagePath: process.env.FILE_STORAGE_PATH
}