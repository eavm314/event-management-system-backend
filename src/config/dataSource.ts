import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { db, env } from './config';

export const dataSource: TypeOrmModuleOptions = {
  type: db.type,
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: env.environment === 'develop' ? true : false,
};
