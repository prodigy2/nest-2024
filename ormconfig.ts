import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import getConfig from './src/configs/configuration';
import * as process from 'process';
import { UserEntity } from './src/database/entities/user.entity';
import { PostEntity } from './src/database/entities/post.entity';

dotenv.config({ path: './environments/local.env' });

const PostgresConfig = getConfig().database;

export default new DataSource({
  type: 'postgres',
  host: PostgresConfig.host,
  port: PostgresConfig.port,
  username: PostgresConfig.user,
  password: PostgresConfig.password,
  database: PostgresConfig.dbName,
  entities: [ UserEntity, PostEntity,
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: false,
});
